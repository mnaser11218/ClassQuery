package rocks.zipcode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tag.
 */
@Entity
@Table(name = "tag")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tag_name")
    private String tagName;

    @Column(name = "tag_description")
    private String tagDescription;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "lab_name")
    private String labName;

    @Column(name = "lab_topic")
    private String labTopic;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tags")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "answers", "tags", "assignment", "userProfile" }, allowSetters = true)
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTagName() {
        return this.tagName;
    }

    public Tag tagName(String tagName) {
        this.setTagName(tagName);
        return this;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getTagDescription() {
        return this.tagDescription;
    }

    public Tag tagDescription(String tagDescription) {
        this.setTagDescription(tagDescription);
        return this;
    }

    public void setTagDescription(String tagDescription) {
        this.tagDescription = tagDescription;
    }

    public LocalDate getCreatedDate() {
        return this.createdDate;
    }

    public Tag createdDate(LocalDate createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getLabName() {
        return this.labName;
    }

    public Tag labName(String labName) {
        this.setLabName(labName);
        return this;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getLabTopic() {
        return this.labTopic;
    }

    public Tag labTopic(String labTopic) {
        this.setLabTopic(labTopic);
        return this;
    }

    public void setLabTopic(String labTopic) {
        this.labTopic = labTopic;
    }

    public Set<Question> getQuestions() {
        return this.questions;
    }

    public void setQuestions(Set<Question> questions) {
        if (this.questions != null) {
            this.questions.forEach(i -> i.removeTags(this));
        }
        if (questions != null) {
            questions.forEach(i -> i.addTags(this));
        }
        this.questions = questions;
    }

    public Tag questions(Set<Question> questions) {
        this.setQuestions(questions);
        return this;
    }

    public Tag addQuestions(Question question) {
        this.questions.add(question);
        question.getTags().add(this);
        return this;
    }

    public Tag removeQuestions(Question question) {
        this.questions.remove(question);
        question.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return getId() != null && getId().equals(((Tag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", tagName='" + getTagName() + "'" +
            ", tagDescription='" + getTagDescription() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", labName='" + getLabName() + "'" +
            ", labTopic='" + getLabTopic() + "'" +
            "}";
    }
}
