package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class TagAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTagAllPropertiesEquals(Tag expected, Tag actual) {
        assertTagAutoGeneratedPropertiesEquals(expected, actual);
        assertTagAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTagAllUpdatablePropertiesEquals(Tag expected, Tag actual) {
        assertTagUpdatableFieldsEquals(expected, actual);
        assertTagUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTagAutoGeneratedPropertiesEquals(Tag expected, Tag actual) {
        assertThat(expected)
            .as("Verify Tag auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTagUpdatableFieldsEquals(Tag expected, Tag actual) {
        assertThat(expected)
            .as("Verify Tag relevant properties")
            .satisfies(e -> assertThat(e.getTagName()).as("check tagName").isEqualTo(actual.getTagName()))
            .satisfies(e -> assertThat(e.getTagDescription()).as("check tagDescription").isEqualTo(actual.getTagDescription()))
            .satisfies(e -> assertThat(e.getCreatedDate()).as("check createdDate").isEqualTo(actual.getCreatedDate()))
            .satisfies(e -> assertThat(e.getLabName()).as("check labName").isEqualTo(actual.getLabName()))
            .satisfies(e -> assertThat(e.getLabTopic()).as("check labTopic").isEqualTo(actual.getLabTopic()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTagUpdatableRelationshipsEquals(Tag expected, Tag actual) {
        assertThat(expected)
            .as("Verify Tag relationships")
            .satisfies(e -> assertThat(e.getQuestions()).as("check questions").isEqualTo(actual.getQuestions()));
    }
}
