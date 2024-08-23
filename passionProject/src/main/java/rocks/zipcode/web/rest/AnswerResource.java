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
import rocks.zipcode.domain.Answer;
import rocks.zipcode.repository.AnswerRepository;
import rocks.zipcode.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rocks.zipcode.domain.Answer}.
 */
@RestController
@RequestMapping("/api/answers")
@Transactional
public class AnswerResource {

    private static final Logger log = LoggerFactory.getLogger(AnswerResource.class);

    private static final String ENTITY_NAME = "answer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnswerRepository answerRepository;

    public AnswerResource(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    /**
     * {@code POST  /answers} : Create a new answer.
     *
     * @param answer the answer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new answer, or with status {@code 400 (Bad Request)} if the answer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to save Answer : {}", answer);
        if (answer.getId() != null) {
            throw new BadRequestAlertException("A new answer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        answer = answerRepository.save(answer);
        return ResponseEntity.created(new URI("/api/answers/" + answer.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, answer.getId().toString()))
            .body(answer);
    }

    /**
     * {@code PUT  /answers/:id} : Updates an existing answer.
     *
     * @param id the id of the answer to save.
     * @param answer the answer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answer,
     * or with status {@code 400 (Bad Request)} if the answer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the answer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable(value = "id", required = false) final Long id, @RequestBody Answer answer)
        throws URISyntaxException {
        log.debug("REST request to update Answer : {}, {}", id, answer);
        if (answer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, answer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!answerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        answer = answerRepository.save(answer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, answer.getId().toString()))
            .body(answer);
    }

    /**
     * {@code PATCH  /answers/:id} : Partial updates given fields of an existing answer, field will ignore if it is null
     *
     * @param id the id of the answer to save.
     * @param answer the answer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answer,
     * or with status {@code 400 (Bad Request)} if the answer is not valid,
     * or with status {@code 404 (Not Found)} if the answer is not found,
     * or with status {@code 500 (Internal Server Error)} if the answer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Answer> partialUpdateAnswer(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Answer answer
    ) throws URISyntaxException {
        log.debug("REST request to partial update Answer partially : {}, {}", id, answer);
        if (answer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, answer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!answerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Answer> result = answerRepository
            .findById(answer.getId())
            .map(existingAnswer -> {
                if (answer.getAnswer() != null) {
                    existingAnswer.setAnswer(answer.getAnswer());
                }
                if (answer.getCreatedDate() != null) {
                    existingAnswer.setCreatedDate(answer.getCreatedDate());
                }

                return existingAnswer;
            })
            .map(answerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, answer.getId().toString())
        );
    }

    /**
     * {@code GET  /answers} : get all the answers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of answers in body.
     */
    @GetMapping("")
    public List<Answer> getAllAnswers() {
        log.debug("REST request to get all Answers");
        return answerRepository.findAll();
    }

    /**
     * {@code GET  /answers/:id} : get the "id" answer.
     *
     * @param id the id of the answer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswer(@PathVariable("id") Long id) {
        log.debug("REST request to get Answer : {}", id);
        Optional<Answer> answer = answerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(answer);
    }

    /**
     * {@code DELETE  /answers/:id} : delete the "id" answer.
     *
     * @param id the id of the answer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable("id") Long id) {
        log.debug("REST request to delete Answer : {}", id);
        answerRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
