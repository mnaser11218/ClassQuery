package rocks.zipcode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "about_me")
    private String aboutMe;

    @Column(name = "created")
    private LocalDate created;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userProfile")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tags", "answers", "userProfile" }, allowSetters = true)
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserProfile id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public UserProfile name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public UserProfile emailAddress(String emailAddress) {
        this.setEmailAddress(emailAddress);
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getAboutMe() {
        return this.aboutMe;
    }

    public UserProfile aboutMe(String aboutMe) {
        this.setAboutMe(aboutMe);
        return this;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public LocalDate getCreated() {
        return this.created;
    }

    public UserProfile created(LocalDate created) {
        this.setCreated(created);
        return this;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public Set<Question> getQuestions() {
        return this.questions;
    }

    public void setQuestions(Set<Question> questions) {
        if (this.questions != null) {
            this.questions.forEach(i -> i.setUserProfile(null));
        }
        if (questions != null) {
            questions.forEach(i -> i.setUserProfile(this));
        }
        this.questions = questions;
    }

    public UserProfile questions(Set<Question> questions) {
        this.setQuestions(questions);
        return this;
    }

    public UserProfile addQuestions(Question question) {
        this.questions.add(question);
        question.setUserProfile(this);
        return this;
    }

    public UserProfile removeQuestions(Question question) {
        this.questions.remove(question);
        question.setUserProfile(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProfile)) {
            return false;
        }
        return getId() != null && getId().equals(((UserProfile) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            ", aboutMe='" + getAboutMe() + "'" +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
