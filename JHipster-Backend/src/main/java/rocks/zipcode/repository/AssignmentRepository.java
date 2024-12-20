package rocks.zipcode.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rocks.zipcode.domain.Assignment;
import rocks.zipcode.domain.Question;

import java.util.List;

/**
 * Spring Data JPA repository for the Assignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}
