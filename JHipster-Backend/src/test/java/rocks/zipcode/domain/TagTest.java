package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.QuestionTestSamples.*;
import static rocks.zipcode.domain.TagTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import rocks.zipcode.web.rest.TestUtil;

class TagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tag.class);
        Tag tag1 = getTagSample1();
        Tag tag2 = new Tag();
        assertThat(tag1).isNotEqualTo(tag2);

        tag2.setId(tag1.getId());
        assertThat(tag1).isEqualTo(tag2);

        tag2 = getTagSample2();
        assertThat(tag1).isNotEqualTo(tag2);
    }

    @Test
    void questionsTest() {
        Tag tag = getTagRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        tag.addQuestions(questionBack);
        assertThat(tag.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getTags()).containsOnly(tag);

        tag.removeQuestions(questionBack);
        assertThat(tag.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getTags()).doesNotContain(tag);

        tag.questions(new HashSet<>(Set.of(questionBack)));
        assertThat(tag.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getTags()).containsOnly(tag);

        tag.setQuestions(new HashSet<>());
        assertThat(tag.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getTags()).doesNotContain(tag);
    }
}
