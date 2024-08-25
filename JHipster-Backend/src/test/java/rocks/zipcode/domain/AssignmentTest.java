package rocks.zipcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static rocks.zipcode.domain.AssignmentTestSamples.*;
import static rocks.zipcode.domain.QuestionTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import rocks.zipcode.web.rest.TestUtil;

class AssignmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assignment.class);
        Assignment assignment1 = getAssignmentSample1();
        Assignment assignment2 = new Assignment();
        assertThat(assignment1).isNotEqualTo(assignment2);

        assignment2.setId(assignment1.getId());
        assertThat(assignment1).isEqualTo(assignment2);

        assignment2 = getAssignmentSample2();
        assertThat(assignment1).isNotEqualTo(assignment2);
    }

    @Test
    void questionsTest() {
        Assignment assignment = getAssignmentRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        assignment.addQuestions(questionBack);
        assertThat(assignment.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getAssignment()).isEqualTo(assignment);

        assignment.removeQuestions(questionBack);
        assertThat(assignment.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getAssignment()).isNull();

        assignment.questions(new HashSet<>(Set.of(questionBack)));
        assertThat(assignment.getQuestions()).containsOnly(questionBack);
        assertThat(questionBack.getAssignment()).isEqualTo(assignment);

        assignment.setQuestions(new HashSet<>());
        assertThat(assignment.getQuestions()).doesNotContain(questionBack);
        assertThat(questionBack.getAssignment()).isNull();
    }
}
