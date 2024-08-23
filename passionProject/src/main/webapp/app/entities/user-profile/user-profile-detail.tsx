import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-profile.reducer';

export const UserProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userProfileDetailsHeading">
          <Translate contentKey="zipcodeoverflowApp.userProfile.detail.title">UserProfile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="zipcodeoverflowApp.userProfile.name">Name</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.name}</dd>
          <dt>
            <span id="emailAddress">
              <Translate contentKey="zipcodeoverflowApp.userProfile.emailAddress">Email Address</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.emailAddress}</dd>
          <dt>
            <span id="aboutMe">
              <Translate contentKey="zipcodeoverflowApp.userProfile.aboutMe">About Me</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.aboutMe}</dd>
          <dt>
            <span id="created">
              <Translate contentKey="zipcodeoverflowApp.userProfile.created">Created</Translate>
            </span>
          </dt>
          <dd>
            {userProfileEntity.created ? <TextFormat value={userProfileEntity.created} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/user-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserProfileDetail;
