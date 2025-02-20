package rocks.zipcode.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rocks.zipcode.domain.Question;

/**
 * Spring Data JPA repository for the Question entity.
 *
 * When extending this class, extend QuestionRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface QuestionRepository extends QuestionRepositoryWithBagRelationships, JpaRepository<Question, Long> {
    default Optional<Question> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Question> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Question> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
    @Query(value = "select * from question where assignment_id=?1", nativeQuery = true)
    List<Question> getQuestionsOfAssignments(Long questionId);
//"select * from question where assignment_id=?1"
    @Modifying
    @Query(value="UPDATE question set liked= ?1 where id= ?2", nativeQuery = true)
    public void updateLike(Long liked, Long id);

    @Query(value="select question.* from question \n" +
        "join REL_QUESTION__TAGS on REL_QUESTION__TAGS.question_id = question.id\n" +
        "where tags_id=?1", nativeQuery = true)
    List<Question>getQuestionsByTagId(Long id);
}
