package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.AnswerTestSamples.*;
import static rocks.zipcode.domain.QuestionTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import rocks.zipcode.web.rest.TestUtil;

class AnswerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Answer.class);
        Answer answer1 = getAnswerSample1();
        Answer answer2 = new Answer();
        assertThat(answer1).isNotEqualTo(answer2);

        answer2.setId(answer1.getId());
        assertThat(answer1).isEqualTo(answer2);

        answer2 = getAnswerSample2();
        assertThat(answer1).isNotEqualTo(answer2);
    }

    @Test
    void questionsTest() {
        Answer answer = getAnswerRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        answer.addQuestions(questionBack);
        assertThat(answer.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getAnswers()).containsOnly(answer);

        answer.removeQuestions(questionBack);
        assertThat(answer.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getAnswers()).doesNotContain(answer);

        answer.questions(new HashSet<>(Set.of(questionBack)));
        assertThat(answer.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getAnswers()).containsOnly(answer);

        answer.setQuestions(new HashSet<>());
        assertThat(answer.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getAnswers()).doesNotContain(answer);
    }
}
