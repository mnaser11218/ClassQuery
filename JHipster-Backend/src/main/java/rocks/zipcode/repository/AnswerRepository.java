package rocks.zipcode.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rocks.zipcode.domain.Answer;

import java.util.List;

/**
 * Spring Data JPA repository for the Answer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query(value = "select answer.* from answer\n" +
        "join question on question.id = answer.question_id\n" +
        "where answer.question_id = ?1", nativeQuery = true)
    List<Answer> getAnswersByQuestionId(Long questionId);


    @Query(value="select Count(id) from answer \n" +
        "where question_id = ?1", nativeQuery = true)
    Long getNumberOfAnswersByQuestionId(Long questionId);
}
