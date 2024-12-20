package rocks.zipcode.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
import rocks.zipcode.repository.AssignmentRepository;
import rocks.zipcode.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rocks.zipcode.domain.Assignment}.
 */
@RestController
@RequestMapping("/api/assignments")
@Transactional
public class AssignmentResource {

    private static final Logger LOG = LoggerFactory.getLogger(AssignmentResource.class);

    private static final String ENTITY_NAME = "assignment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssignmentRepository assignmentRepository;

    public AssignmentResource(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    /**
     * {@code POST  /assignments} : Create a new assignment.
     *
     * @param assignment the assignment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assignment, or with status {@code 400 (Bad Request)} if the assignment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Assignment> createAssignment(@Valid @RequestBody Assignment assignment) throws URISyntaxException {
        LOG.debug("REST request to save Assignment : {}", assignment);
        if (assignment.getId() != null) {
            throw new BadRequestAlertException("A new assignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        assignment = assignmentRepository.save(assignment);
        return ResponseEntity.created(new URI("/api/assignments/" + assignment.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, assignment.getId().toString()))
            .body(assignment);
    }

    /**
     * {@code PUT  /assignments/:id} : Updates an existing assignment.
     *
     * @param id the id of the assignment to save.
     * @param assignment the assignment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignment,
     * or with status {@code 400 (Bad Request)} if the assignment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assignment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Assignment assignment
    ) throws URISyntaxException {
        LOG.debug("REST request to update Assignment : {}, {}", id, assignment);
        if (assignment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        assignment = assignmentRepository.save(assignment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignment.getId().toString()))
            .body(assignment);
    }

    /**
     * {@code PATCH  /assignments/:id} : Partial updates given fields of an existing assignment, field will ignore if it is null
     *
     * @param id the id of the assignment to save.
     * @param assignment the assignment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignment,
     * or with status {@code 400 (Bad Request)} if the assignment is not valid,
     * or with status {@code 404 (Not Found)} if the assignment is not found,
     * or with status {@code 500 (Internal Server Error)} if the assignment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Assignment> partialUpdateAssignment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Assignment assignment
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Assignment partially : {}, {}", id, assignment);
        if (assignment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Assignment> result = assignmentRepository
            .findById(assignment.getId())
            .map(existingAssignment -> {
                if (assignment.getName() != null) {
                    existingAssignment.setName(assignment.getName());
                }
                if (assignment.getTopic() != null) {
                    existingAssignment.setTopic(assignment.getTopic());
                }
                if (assignment.getCourseName() != null) {
                    existingAssignment.setCourseName(assignment.getCourseName());
                }
                if (assignment.getDescription() != null) {
                    existingAssignment.setDescription(assignment.getDescription());
                }
                if (assignment.getCreated() != null) {
                    existingAssignment.setCreated(assignment.getCreated());
                }

                return existingAssignment;
            })
            .map(assignmentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignment.getId().toString())
        );
    }

    /**
     * {@code GET  /assignments} : get all the assignments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assignments in body.
     */
    @GetMapping("")
    public List<Assignment> getAllAssignments() {
        LOG.debug("REST request to get all Assignments");
        return assignmentRepository.findAll();
    }

    /**
     * {@code GET  /assignments/:id} : get the "id" assignment.
     *
     * @param id the id of the assignment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assignment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Assignment : {}", id);
        Optional<Assignment> assignment = assignmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(assignment);
    }

    /**
     * {@code DELETE  /assignments/:id} : delete the "id" assignment.
     *
     * @param id the id of the assignment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Assignment : {}", id);
        assignmentRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
