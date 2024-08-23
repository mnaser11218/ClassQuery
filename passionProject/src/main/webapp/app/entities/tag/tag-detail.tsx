import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tag.reducer';

export const TagDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const tagEntity = useAppSelector(state => state.tag.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tagDetailsHeading">
          <Translate contentKey="zipcodeoverflowApp.tag.detail.title">Tag</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tagEntity.id}</dd>
          <dt>
            <span id="tagName">
              <Translate contentKey="zipcodeoverflowApp.tag.tagName">Tag Name</Translate>
            </span>
          </dt>
          <dd>{tagEntity.tagName}</dd>
          <dt>
            <span id="tagDescription">
              <Translate contentKey="zipcodeoverflowApp.tag.tagDescription">Tag Description</Translate>
            </span>
          </dt>
          <dd>{tagEntity.tagDescription}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="zipcodeoverflowApp.tag.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{tagEntity.createdDate ? <TextFormat value={tagEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="labName">
              <Translate contentKey="zipcodeoverflowApp.tag.labName">Lab Name</Translate>
            </span>
          </dt>
          <dd>{tagEntity.labName}</dd>
          <dt>
            <span id="labTopic">
              <Translate contentKey="zipcodeoverflowApp.tag.labTopic">Lab Topic</Translate>
            </span>
          </dt>
          <dd>{tagEntity.labTopic}</dd>
          <dt>
            <Translate contentKey="zipcodeoverflowApp.tag.questions">Questions</Translate>
          </dt>
          <dd>
            {tagEntity.questions
              ? tagEntity.questions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {tagEntity.questions && i === tagEntity.questions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/tag" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tag/${tagEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TagDetail;
