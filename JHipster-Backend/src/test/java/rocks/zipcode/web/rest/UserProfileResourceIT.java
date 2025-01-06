//package rocks.zipcode.web.rest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import static rocks.zipcode.domain.UserProfileAsserts.*;
//import static rocks.zipcode.web.rest.TestUtil.createUpdateProxyForBean;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.persistence.EntityManager;
//import java.time.LocalDate;
//import java.time.ZoneId;
//import java.util.Random;
//import java.util.concurrent.atomic.AtomicLong;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.transaction.annotation.Transactional;
//import rocks.zipcode.IntegrationTest;
//import rocks.zipcode.domain.UserProfile;
//import rocks.zipcode.repository.UserProfileRepository;
//
///**
// * Integration tests for the {@link UserProfileResource} REST controller.
// */
//@IntegrationTest
//@AutoConfigureMockMvc
//@WithMockUser
//class UserProfileResourceIT {
//
//    private static final String DEFAULT_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_NAME = "BBBBBBBBBB";
//
//    private static final String DEFAULT_EMAIL_ADDRESS = "AAAAAAAAAA";
//    private static final String UPDATED_EMAIL_ADDRESS = "BBBBBBBBBB";
//
//    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
//    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";
//
//    private static final String DEFAULT_ABOUT_ME = "AAAAAAAAAA";
//    private static final String UPDATED_ABOUT_ME = "BBBBBBBBBB";
//
//    private static final LocalDate DEFAULT_CREATED = LocalDate.ofEpochDay(0L);
//    private static final LocalDate UPDATED_CREATED = LocalDate.now(ZoneId.systemDefault());
//
//    private static final String ENTITY_API_URL = "/api/user-profiles";
//    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
//
//    private static Random random = new Random();
//    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
//
//    @Autowired
//    private ObjectMapper om;
//
//    @Autowired
//    private UserProfileRepository userProfileRepository;
//
//    @Autowired
//    private EntityManager em;
//
//    @Autowired
//    private MockMvc restUserProfileMockMvc;
//
//    private UserProfile userProfile;
//
//    private UserProfile insertedUserProfile;
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static UserProfile createEntity() {
//        return new UserProfile()
//            .name(DEFAULT_NAME)
//            .emailAddress(DEFAULT_EMAIL_ADDRESS)
//            .password(DEFAULT_PASSWORD)
//            .aboutMe(DEFAULT_ABOUT_ME)
//            .created(DEFAULT_CREATED);
//    }
//
//    /**
//     * Create an updated entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static UserProfile createUpdatedEntity() {
//        return new UserProfile()
//            .name(UPDATED_NAME)
//            .emailAddress(UPDATED_EMAIL_ADDRESS)
//            .password(UPDATED_PASSWORD)
//            .aboutMe(UPDATED_ABOUT_ME)
//            .created(UPDATED_CREATED);
//    }
//
//    @BeforeEach
//    public void initTest() {
//        userProfile = createEntity();
//    }
//
//    @AfterEach
//    public void cleanup() {
//        if (insertedUserProfile != null) {
//            userProfileRepository.delete(insertedUserProfile);
//            insertedUserProfile = null;
//        }
//    }
//
//    @Test
//    @Transactional
//    void createUserProfile() throws Exception {
//        long databaseSizeBeforeCreate = getRepositoryCount();
//        // Create the UserProfile
//        var returnedUserProfile = om.readValue(
//            restUserProfileMockMvc
//                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
//                .andExpect(status().isCreated())
//                .andReturn()
//                .getResponse()
//                .getContentAsString(),
//            UserProfile.class
//        );
//
//        // Validate the UserProfile in the database
//        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
//        assertUserProfileUpdatableFieldsEquals(returnedUserProfile, getPersistedUserProfile(returnedUserProfile));
//
//        insertedUserProfile = returnedUserProfile;
//    }
//
//    @Test
//    @Transactional
//    void createUserProfileWithExistingId() throws Exception {
//        // Create the UserProfile with an existing ID
//        userProfile.setId(1L);
//
//        long databaseSizeBeforeCreate = getRepositoryCount();
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restUserProfileMockMvc
//            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeCreate);
//    }
//
//    @Test
//    @Transactional
//    void checkNameIsRequired() throws Exception {
//        long databaseSizeBeforeTest = getRepositoryCount();
//        // set the field null
//        userProfile.setName(null);
//
//        // Create the UserProfile, which fails.
//
//        restUserProfileMockMvc
//            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
//            .andExpect(status().isBadRequest());
//
//        assertSameRepositoryCount(databaseSizeBeforeTest);
//    }
//
//    @Test
//    @Transactional
//    void getAllUserProfiles() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        // Get all the userProfileList
//        restUserProfileMockMvc
//            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(userProfile.getId().intValue())))
//            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
//            .andExpect(jsonPath("$.[*].emailAddress").value(hasItem(DEFAULT_EMAIL_ADDRESS)))
//            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
//            .andExpect(jsonPath("$.[*].aboutMe").value(hasItem(DEFAULT_ABOUT_ME)))
//            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())));
//    }
//
//    @Test
//    @Transactional
//    void getUserProfile() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        // Get the userProfile
//        restUserProfileMockMvc
//            .perform(get(ENTITY_API_URL_ID, userProfile.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
//            .andExpect(jsonPath("$.id").value(userProfile.getId().intValue()))
//            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
//            .andExpect(jsonPath("$.emailAddress").value(DEFAULT_EMAIL_ADDRESS))
//            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
//            .andExpect(jsonPath("$.aboutMe").value(DEFAULT_ABOUT_ME))
//            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()));
//    }
//
//    @Test
//    @Transactional
//    void getNonExistingUserProfile() throws Exception {
//        // Get the userProfile
//        restUserProfileMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    void putExistingUserProfile() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//
//        // Update the userProfile
//        UserProfile updatedUserProfile = userProfileRepository.findById(userProfile.getId()).orElseThrow();
//        // Disconnect from session so that the updates on updatedUserProfile are not directly saved in db
//        em.detach(updatedUserProfile);
//        updatedUserProfile
//            .name(UPDATED_NAME)
//            .emailAddress(UPDATED_EMAIL_ADDRESS)
//            .password(UPDATED_PASSWORD)
//            .aboutMe(UPDATED_ABOUT_ME)
//            .created(UPDATED_CREATED);
//
//        restUserProfileMockMvc
//            .perform(
//                put(ENTITY_API_URL_ID, updatedUserProfile.getId())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(om.writeValueAsBytes(updatedUserProfile))
//            )
//            .andExpect(status().isOk());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//        assertPersistedUserProfileToMatchAllProperties(updatedUserProfile);
//    }
//
//    @Test
//    @Transactional
//    void putNonExistingUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(
//                put(ENTITY_API_URL_ID, userProfile.getId())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(om.writeValueAsBytes(userProfile))
//            )
//            .andExpect(status().isBadRequest());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void putWithIdMismatchUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(
//                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(om.writeValueAsBytes(userProfile))
//            )
//            .andExpect(status().isBadRequest());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void putWithMissingIdPathParamUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
//            .andExpect(status().isMethodNotAllowed());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void partialUpdateUserProfileWithPatch() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//
//        // Update the userProfile using partial update
//        UserProfile partialUpdatedUserProfile = new UserProfile();
//        partialUpdatedUserProfile.setId(userProfile.getId());
//
//        partialUpdatedUserProfile.name(UPDATED_NAME).password(UPDATED_PASSWORD).aboutMe(UPDATED_ABOUT_ME).created(UPDATED_CREATED);
//
//        restUserProfileMockMvc
//            .perform(
//                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
//                    .contentType("application/merge-patch+json")
//                    .content(om.writeValueAsBytes(partialUpdatedUserProfile))
//            )
//            .andExpect(status().isOk());
//
//        // Validate the UserProfile in the database
//
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//        assertUserProfileUpdatableFieldsEquals(
//            createUpdateProxyForBean(partialUpdatedUserProfile, userProfile),
//            getPersistedUserProfile(userProfile)
//        );
//    }
//
//    @Test
//    @Transactional
//    void fullUpdateUserProfileWithPatch() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//
//        // Update the userProfile using partial update
//        UserProfile partialUpdatedUserProfile = new UserProfile();
//        partialUpdatedUserProfile.setId(userProfile.getId());
//
//        partialUpdatedUserProfile
//            .name(UPDATED_NAME)
//            .emailAddress(UPDATED_EMAIL_ADDRESS)
//            .password(UPDATED_PASSWORD)
//            .aboutMe(UPDATED_ABOUT_ME)
//            .created(UPDATED_CREATED);
//
//        restUserProfileMockMvc
//            .perform(
//                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
//                    .contentType("application/merge-patch+json")
//                    .content(om.writeValueAsBytes(partialUpdatedUserProfile))
//            )
//            .andExpect(status().isOk());
//
//        // Validate the UserProfile in the database
//
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//        assertUserProfileUpdatableFieldsEquals(partialUpdatedUserProfile, getPersistedUserProfile(partialUpdatedUserProfile));
//    }
//
//    @Test
//    @Transactional
//    void patchNonExistingUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(
//                patch(ENTITY_API_URL_ID, userProfile.getId())
//                    .contentType("application/merge-patch+json")
//                    .content(om.writeValueAsBytes(userProfile))
//            )
//            .andExpect(status().isBadRequest());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void patchWithIdMismatchUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(
//                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
//                    .contentType("application/merge-patch+json")
//                    .content(om.writeValueAsBytes(userProfile))
//            )
//            .andExpect(status().isBadRequest());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void patchWithMissingIdPathParamUserProfile() throws Exception {
//        long databaseSizeBeforeUpdate = getRepositoryCount();
//        userProfile.setId(longCount.incrementAndGet());
//
//        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
//        restUserProfileMockMvc
//            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(userProfile)))
//            .andExpect(status().isMethodNotAllowed());
//
//        // Validate the UserProfile in the database
//        assertSameRepositoryCount(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    void deleteUserProfile() throws Exception {
//        // Initialize the database
//        insertedUserProfile = userProfileRepository.saveAndFlush(userProfile);
//
//        long databaseSizeBeforeDelete = getRepositoryCount();
//
//        // Delete the userProfile
//        restUserProfileMockMvc
//            .perform(delete(ENTITY_API_URL_ID, userProfile.getId()).accept(MediaType.APPLICATION_JSON))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
//    }
//
//    protected long getRepositoryCount() {
//        return userProfileRepository.count();
//    }
//
//    protected void assertIncrementedRepositoryCount(long countBefore) {
//        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
//    }
//
//    protected void assertDecrementedRepositoryCount(long countBefore) {
//        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
//    }
//
//    protected void assertSameRepositoryCount(long countBefore) {
//        assertThat(countBefore).isEqualTo(getRepositoryCount());
//    }
//
//    protected UserProfile getPersistedUserProfile(UserProfile userProfile) {
//        return userProfileRepository.findById(userProfile.getId()).orElseThrow();
//    }
//
//    protected void assertPersistedUserProfileToMatchAllProperties(UserProfile expectedUserProfile) {
//        assertUserProfileAllPropertiesEquals(expectedUserProfile, getPersistedUserProfile(expectedUserProfile));
//    }
//
//    protected void assertPersistedUserProfileToMatchUpdatableProperties(UserProfile expectedUserProfile) {
//        assertUserProfileAllUpdatablePropertiesEquals(expectedUserProfile, getPersistedUserProfile(expectedUserProfile));
//    }
//}
