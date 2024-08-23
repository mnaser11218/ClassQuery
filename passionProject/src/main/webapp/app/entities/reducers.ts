import userProfile from 'app/entities/user-profile/user-profile.reducer';
import question from 'app/entities/question/question.reducer';
import answer from 'app/entities/answer/answer.reducer';
import tag from 'app/entities/tag/tag.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  question,
  answer,
  tag,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
