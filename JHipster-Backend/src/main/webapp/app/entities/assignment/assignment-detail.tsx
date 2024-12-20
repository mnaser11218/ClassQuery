import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './assignment.reducer';

export const AssignmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assignmentEntity = useAppSelector(state => state.assignment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assignmentDetailsHeading">
          <Translate contentKey="zipcodeoverflowApp.assignment.detail.title">Assignment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assignmentEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="zipcodeoverflowApp.assignment.name">Name</Translate>
            </span>
          </dt>
          <dd>{assignmentEntity.name}</dd>
          <dt>
            <span id="topic">
              <Translate contentKey="zipcodeoverflowApp.assignment.topic">Topic</Translate>
            </span>
          </dt>
          <dd>{assignmentEntity.topic}</dd>
          <dt>
            <span id="courseName">
              <Translate contentKey="zipcodeoverflowApp.assignment.courseName">Course Name</Translate>
            </span>
          </dt>
          <dd>{assignmentEntity.courseName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="zipcodeoverflowApp.assignment.description">Description</Translate>
            </span>
          </dt>
          <dd>{assignmentEntity.description}</dd>
          <dt>
            <span id="created">
              <Translate contentKey="zipcodeoverflowApp.assignment.created">Created</Translate>
            </span>
          </dt>
          <dd>
            {assignmentEntity.created ? <TextFormat value={assignmentEntity.created} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/assignment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/assignment/${assignmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssignmentDetail;
