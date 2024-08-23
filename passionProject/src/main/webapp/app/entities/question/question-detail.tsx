import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './question.reducer';

export const QuestionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const questionEntity = useAppSelector(state => state.question.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="questionDetailsHeading">
          <Translate contentKey="zipcodeoverflowApp.question.detail.title">Question</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{questionEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="zipcodeoverflowApp.question.title">Title</Translate>
            </span>
          </dt>
          <dd>{questionEntity.title}</dd>
          <dt>
            <span id="question">
              <Translate contentKey="zipcodeoverflowApp.question.question">Question</Translate>
            </span>
          </dt>
          <dd>{questionEntity.question}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="zipcodeoverflowApp.question.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {questionEntity.createdDate ? (
              <TextFormat value={questionEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="zipcodeoverflowApp.question.tags">Tags</Translate>
          </dt>
          <dd>
            {questionEntity.tags
              ? questionEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {questionEntity.tags && i === questionEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="zipcodeoverflowApp.question.answers">Answers</Translate>
          </dt>
          <dd>
            {questionEntity.answers
              ? questionEntity.answers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {questionEntity.answers && i === questionEntity.answers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="zipcodeoverflowApp.question.userProfile">User Profile</Translate>
          </dt>
          <dd>{questionEntity.userProfile ? questionEntity.userProfile.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/question" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question/${questionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuestionDetail;
