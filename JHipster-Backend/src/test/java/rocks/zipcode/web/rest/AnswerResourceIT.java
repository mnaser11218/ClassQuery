package rocks.zipcode.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static rocks.zipcode.domain.AnswerAsserts.*;
import static rocks.zipcode.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import rocks.zipcode.IntegrationTest;
import rocks.zipcode.domain.Answer;
import rocks.zipcode.repository.AnswerRepository;

/**
 * Integration tests for the {@link AnswerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AnswerResourceIT {

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final Long DEFAULT_LIKED = 1L;
    private static final Long UPDATED_LIKED = 2L;

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/answers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnswerMockMvc;

    private Answer answer;

    private Answer insertedAnswer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answer createEntity() {
        return new Answer().answer(DEFAULT_ANSWER).liked(DEFAULT_LIKED).createdDate(DEFAULT_CREATED_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answer createUpdatedEntity() {
        return new Answer().answer(UPDATED_ANSWER).liked(UPDATED_LIKED).createdDate(UPDATED_CREATED_DATE);
    }

    @BeforeEach
    public void initTest() {
        answer = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAnswer != null) {
            answerRepository.delete(insertedAnswer);
            insertedAnswer = null;
        }
    }

    @Test
    @Transactional
    void createAnswer() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Answer
        var returnedAnswer = om.readValue(
            restAnswerMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(answer)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Answer.class
        );

        // Validate the Answer in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertAnswerUpdatableFieldsEquals(returnedAnswer, getPersistedAnswer(returnedAnswer));

        insertedAnswer = returnedAnswer;
    }

    @Test
    @Transactional
    void createAnswerWithExistingId() throws Exception {
        // Create the Answer with an existing ID
        answer.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(answer)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAnswers() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        // Get all the answerList
        restAnswerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answer.getId().intValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    void getAnswer() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        // Get the answer
        restAnswerMockMvc
            .perform(get(ENTITY_API_URL_ID, answer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(answer.getId().intValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAnswer() throws Exception {
        // Get the answer
        restAnswerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnswer() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the answer
        Answer updatedAnswer = answerRepository.findById(answer.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAnswer are not directly saved in db
        em.detach(updatedAnswer);
        updatedAnswer.answer(UPDATED_ANSWER).liked(UPDATED_LIKED).createdDate(UPDATED_CREATED_DATE);

        restAnswerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAnswer.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedAnswer))
            )
            .andExpect(status().isOk());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAnswerToMatchAllProperties(updatedAnswer);
    }

    @Test
    @Transactional
    void putNonExistingAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(put(ENTITY_API_URL_ID, answer.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(answer)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(answer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(answer)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnswerWithPatch() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the answer using partial update
        Answer partialUpdatedAnswer = new Answer();
        partialUpdatedAnswer.setId(answer.getId());

        partialUpdatedAnswer.liked(UPDATED_LIKED).createdDate(UPDATED_CREATED_DATE);

        restAnswerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnswer.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnswer))
            )
            .andExpect(status().isOk());

        // Validate the Answer in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnswerUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedAnswer, answer), getPersistedAnswer(answer));
    }

    @Test
    @Transactional
    void fullUpdateAnswerWithPatch() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the answer using partial update
        Answer partialUpdatedAnswer = new Answer();
        partialUpdatedAnswer.setId(answer.getId());

        partialUpdatedAnswer.answer(UPDATED_ANSWER).liked(UPDATED_LIKED).createdDate(UPDATED_CREATED_DATE);

        restAnswerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnswer.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnswer))
            )
            .andExpect(status().isOk());

        // Validate the Answer in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnswerUpdatableFieldsEquals(partialUpdatedAnswer, getPersistedAnswer(partialUpdatedAnswer));
    }

    @Test
    @Transactional
    void patchNonExistingAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, answer.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(answer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(answer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnswer() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        answer.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnswerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(answer)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Answer in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnswer() throws Exception {
        // Initialize the database
        insertedAnswer = answerRepository.saveAndFlush(answer);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the answer
        restAnswerMockMvc
            .perform(delete(ENTITY_API_URL_ID, answer.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return answerRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Answer getPersistedAnswer(Answer answer) {
        return answerRepository.findById(answer.getId()).orElseThrow();
    }

    protected void assertPersistedAnswerToMatchAllProperties(Answer expectedAnswer) {
        assertAnswerAllPropertiesEquals(expectedAnswer, getPersistedAnswer(expectedAnswer));
    }

    protected void assertPersistedAnswerToMatchUpdatableProperties(Answer expectedAnswer) {
        assertAnswerAllUpdatablePropertiesEquals(expectedAnswer, getPersistedAnswer(expectedAnswer));
    }
}
