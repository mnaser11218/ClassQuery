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
    @Query(value="select count(*) from answer where question_id= ?1", nativeQuery = true)
    Long numberOfAnswers(Long questionId);

    @Query(value="select * from answer where question_id =?1", nativeQuery = true)
    List<Answer> answersOfQuestion(Long questionId);
}
