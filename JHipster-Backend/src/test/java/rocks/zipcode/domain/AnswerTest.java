package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.AnswerTestSamples.*;
import static rocks.zipcode.domain.QuestionTestSamples.*;
import static rocks.zipcode.domain.UserProfileTestSamples.*;

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
    void userProfileTest() {
        Answer answer = getAnswerRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        answer.setUserProfile(userProfileBack);
        assertThat(answer.getUserProfile()).isEqualTo(userProfileBack);

        answer.userProfile(null);
        assertThat(answer.getUserProfile()).isNull();
    }

    @Test
    void questionTest() {
        Answer answer = getAnswerRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        answer.setQuestion(questionBack);
        assertThat(answer.getQuestion()).isEqualTo(questionBack);

        answer.question(null);
        assertThat(answer.getQuestion()).isNull();
    }
}
