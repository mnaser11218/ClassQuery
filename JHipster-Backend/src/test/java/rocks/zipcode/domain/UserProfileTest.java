package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.AnswerTestSamples.*;
import static rocks.zipcode.domain.QuestionTestSamples.*;
import static rocks.zipcode.domain.UserProfileTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import rocks.zipcode.web.rest.TestUtil;

class UserProfileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProfile.class);
        UserProfile userProfile1 = getUserProfileSample1();
        UserProfile userProfile2 = new UserProfile();
        assertThat(userProfile1).isNotEqualTo(userProfile2);

        userProfile2.setId(userProfile1.getId());
        assertThat(userProfile1).isEqualTo(userProfile2);

        userProfile2 = getUserProfileSample2();
        assertThat(userProfile1).isNotEqualTo(userProfile2);
    }

    @Test
    void answerTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Answer answerBack = getAnswerRandomSampleGenerator();

        userProfile.addAnswer(answerBack);
        assertThat(userProfile.getAnswers()).containsOnly(answerBack);
        assertThat(answerBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.removeAnswer(answerBack);
        assertThat(userProfile.getAnswers()).doesNotContain(answerBack);
        assertThat(answerBack.getUserProfile()).isNull();

        userProfile.answers(new HashSet<>(Set.of(answerBack)));
        assertThat(userProfile.getAnswers()).containsOnly(answerBack);
        assertThat(answerBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.setAnswers(new HashSet<>());
        assertThat(userProfile.getAnswers()).doesNotContain(answerBack);
        assertThat(answerBack.getUserProfile()).isNull();
    }

    @Test
    void questionsTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        userProfile.addQuestions(questionBack);
        assertThat(userProfile.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.removeQuestions(questionBack);
        assertThat(userProfile.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getUserProfile()).isNull();

        userProfile.questions(new HashSet<>(Set.of(questionBack)));
        assertThat(userProfile.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.setQuestions(new HashSet<>());
        assertThat(userProfile.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getUserProfile()).isNull();
    }
}
