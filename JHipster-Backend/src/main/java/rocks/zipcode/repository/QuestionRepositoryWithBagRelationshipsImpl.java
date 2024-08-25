package rocks.zipcode.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import rocks.zipcode.domain.Question;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class QuestionRepositoryWithBagRelationshipsImpl implements QuestionRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String QUESTIONS_PARAMETER = "questions";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Question> fetchBagRelationships(Optional<Question> question) {
        return question.map(this::fetchTags);
    }

    @Override
    public Page<Question> fetchBagRelationships(Page<Question> questions) {
        return new PageImpl<>(fetchBagRelationships(questions.getContent()), questions.getPageable(), questions.getTotalElements());
    }

    @Override
    public List<Question> fetchBagRelationships(List<Question> questions) {
        return Optional.of(questions).map(this::fetchTags).orElse(Collections.emptyList());
    }

    Question fetchTags(Question result) {
        return entityManager
            .createQuery("select question from Question question left join fetch question.tags where question.id = :id", Question.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Question> fetchTags(List<Question> questions) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, questions.size()).forEach(index -> order.put(questions.get(index).getId(), index));
        List<Question> result = entityManager
            .createQuery(
                "select question from Question question left join fetch question.tags where question in :questions",
                Question.class
            )
            .setParameter(QUESTIONS_PARAMETER, questions)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
