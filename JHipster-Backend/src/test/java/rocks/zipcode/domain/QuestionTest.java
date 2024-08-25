package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.AnswerTestSamples.*;
import static rocks.zipcode.domain.AssignmentTestSamples.*;
import static rocks.zipcode.domain.QuestionTestSamples.*;
import static rocks.zipcode.domain.TagTestSamples.*;
import static rocks.zipcode.domain.UserProfileTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import rocks.zipcode.web.rest.TestUtil;

class QuestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Question.class);
        Question question1 = getQuestionSample1();
        Question question2 = new Question();
        assertThat(question1).isNotEqualTo(question2);

        question2.setId(question1.getId());
        assertThat(question1).isEqualTo(question2);

        question2 = getQuestionSample2();
        assertThat(question1).isNotEqualTo(question2);
    }

    @Test
    void answersTest() {
        Question question = getQuestionRandomSampleGenerator();
        Answer answerBack = getAnswerRandomSampleGenerator();

        question.addAnswers(answerBack);
        assertThat(question.getAnswers()).containsOnly(answerBack);
        assertThat(answerBack.getQuestion()).isEqualTo(question);

        question.removeAnswers(answerBack);
        assertThat(question.getAnswers()).doesNotContain(answerBack);
        assertThat(answerBack.getQuestion()).isNull();

        question.answers(new HashSet<>(Set.of(answerBack)));
        assertThat(question.getAnswers()).containsOnly(answerBack);
        assertThat(answerBack.getQuestion()).isEqualTo(question);

        question.setAnswers(new HashSet<>());
        assertThat(question.getAnswers()).doesNotContain(answerBack);
        assertThat(answerBack.getQuestion()).isNull();
    }

    @Test
    void tagsTest() {
        Question question = getQuestionRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        question.addTags(tagBack);
        assertThat(question.getTags()).containsOnly(tagBack);

        question.removeTags(tagBack);
        assertThat(question.getTags()).doesNotContain(tagBack);

        question.tags(new HashSet<>(Set.of(tagBack)));
        assertThat(question.getTags()).containsOnly(tagBack);

        question.setTags(new HashSet<>());
        assertThat(question.getTags()).doesNotContain(tagBack);
    }

    @Test
    void userProfileTest() {
        Question question = getQuestionRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        question.setUserProfile(userProfileBack);
        assertThat(question.getUserProfile()).isEqualTo(userProfileBack);

        question.userProfile(null);
        assertThat(question.getUserProfile()).isNull();
    }

    @Test
    void assignmentTest() {
        Question question = getQuestionRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        question.setAssignment(assignmentBack);
        assertThat(question.getAssignment()).isEqualTo(assignmentBack);

        question.assignment(null);
        assertThat(question.getAssignment()).isNull();
    }
}
