package rocks.zipcode.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import rocks.zipcode.domain.Assignment;
import rocks.zipcode.domain.Question;
import rocks.zipcode.repository.QuestionRepository;
import rocks.zipcode.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rocks.zipcode.domain.Question}.
 */
@RestController
@RequestMapping("/api/questions")
@Transactional
public class QuestionResource {

    private static final Logger LOG = LoggerFactory.getLogger(QuestionResource.class);

    private static final String ENTITY_NAME = "question";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionRepository questionRepository;

    public QuestionResource(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    /**
     * {@code POST  /questions} : Create a new question.
     *
     * @param question the question to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new question, or with status {@code 400 (Bad Request)} if the question has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) throws URISyntaxException {
        LOG.debug("REST request to save Question : {}", question);
        if (question.getId() != null) {
            throw new BadRequestAlertException("A new question cannot already have an ID", ENTITY_NAME, "idexists");
        }
        question = questionRepository.save(question);
        return ResponseEntity.created(new URI("/api/questions/" + question.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, question.getId().toString()))
            .body(question);
    }

    /**
     * {@code PUT  /questions/:id} : Updates an existing question.
     *
     * @param id the id of the question to save.
     * @param question the question to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated question,
     * or with status {@code 400 (Bad Request)} if the question is not valid,
     * or with status {@code 500 (Internal Server Error)} if the question couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Question question
    ) throws URISyntaxException {
        LOG.debug("REST request to update Question : {}, {}", id, question);
        if (question.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, question.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        question = questionRepository.save(question);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, question.getId().toString()))
            .body(question);
    }

    /**
     * {@code PATCH  /questions/:id} : Partial updates given fields of an existing question, field will ignore if it is null
     *
     * @param id the id of the question to save.
     * @param question the question to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated question,
     * or with status {@code 400 (Bad Request)} if the question is not valid,
     * or with status {@code 404 (Not Found)} if the question is not found,
     * or with status {@code 500 (Internal Server Error)} if the question couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Question> partialUpdateQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Question question
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Question partially : {}, {}", id, question);
        if (question.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, question.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Question> result = questionRepository
            .findById(question.getId())
            .map(existingQuestion -> {
                if (question.getTitle() != null) {
                    existingQuestion.setTitle(question.getTitle());
                }
                if (question.getQuestion() != null) {
                    existingQuestion.setQuestion(question.getQuestion());
                }
                if (question.getLiked() != null) {
                    existingQuestion.setLiked(question.getLiked());
                }
                if (question.getCreatedDate() != null) {
                    existingQuestion.setCreatedDate(question.getCreatedDate());
                }

                return existingQuestion;
            })
            .map(questionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, question.getId().toString())
        );
    }

    /**
     * {@code GET  /questions} : get all the questions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questions in body.
     */
    @GetMapping("")
    public List<Question> getAllQuestions(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        LOG.debug("REST request to get all Questions");
        if (eagerload) {
            return questionRepository.findAllWithEagerRelationships();
        } else {
            return questionRepository.findAll();
        }
    }

    /**
     * {@code GET  /questions/:id} : get the "id" question.
     *
     * @param id the id of the question to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the question, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Question : {}", id);
        Optional<Question> question = questionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(question);
    }

    @GetMapping("/assignment/{id}")
    public List<Question> getAllQuesOfAssignment(@PathVariable("id") Long id){
        LOG.debug("REST request to get all questions based on Assignment id");
        return questionRepository.getQuestionsOfAssignments(id);
    }

    /**
     * {@code DELETE  /questions/:id} : delete the "id" question.
     *
     * @param id the id of the question to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Question : {}", id);
        questionRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
