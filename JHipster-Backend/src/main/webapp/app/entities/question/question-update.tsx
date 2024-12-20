import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntities as getAssignments } from 'app/entities/assignment/assignment.reducer';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { createEntity, getEntity, reset, updateEntity } from './question.reducer';

export const QuestionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tags = useAppSelector(state => state.tag.entities);
  const assignments = useAppSelector(state => state.assignment.entities);
  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const questionEntity = useAppSelector(state => state.question.entity);
  const loading = useAppSelector(state => state.question.loading);
  const updating = useAppSelector(state => state.question.updating);
  const updateSuccess = useAppSelector(state => state.question.updateSuccess);

  const handleClose = () => {
    navigate('/question');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTags({}));
    dispatch(getAssignments({}));
    dispatch(getUserProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.liked !== undefined && typeof values.liked !== 'number') {
      values.liked = Number(values.liked);
    }

    const entity = {
      ...questionEntity,
      ...values,
      tags: mapIdList(values.tags),
      assignment: assignments.find(it => it.id.toString() === values.assignment?.toString()),
      userProfile: userProfiles.find(it => it.id.toString() === values.userProfile?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...questionEntity,
          tags: questionEntity?.tags?.map(e => e.id.toString()),
          assignment: questionEntity?.assignment?.id,
          userProfile: questionEntity?.userProfile?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="zipcodeoverflowApp.question.home.createOrEditLabel" data-cy="QuestionCreateUpdateHeading">
            <Translate contentKey="zipcodeoverflowApp.question.home.createOrEditLabel">Create or edit a Question</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="question-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('zipcodeoverflowApp.question.title')}
                id="question-title"
                name="title"
                data-cy="title"
                type="text"
              />
              <ValidatedField
                label={translate('zipcodeoverflowApp.question.question')}
                id="question-question"
                name="question"
                data-cy="question"
                type="text"
              />
              <ValidatedField
                label={translate('zipcodeoverflowApp.question.liked')}
                id="question-liked"
                name="liked"
                data-cy="liked"
                type="text"
              />
              <ValidatedField
                label={translate('zipcodeoverflowApp.question.createdDate')}
                id="question-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="date"
              />
              <ValidatedField
                label={translate('zipcodeoverflowApp.question.tags')}
                id="question-tags"
                data-cy="tags"
                type="select"
                multiple
                name="tags"
              >
                <option value="" key="0" />
                {tags
                  ? tags.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="question-assignment"
                name="assignment"
                data-cy="assignment"
                label={translate('zipcodeoverflowApp.question.assignment')}
                type="select"
              >
                <option value="" key="0" />
                {assignments
                  ? assignments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="question-userProfile"
                name="userProfile"
                data-cy="userProfile"
                label={translate('zipcodeoverflowApp.question.userProfile')}
                type="select"
              >
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/question" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default QuestionUpdate;
