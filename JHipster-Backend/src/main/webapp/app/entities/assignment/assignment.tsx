import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './assignment.reducer';

export const Assignment = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const assignmentList = useAppSelector(state => state.assignment.entities);
  const loading = useAppSelector(state => state.assignment.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="assignment-heading" data-cy="AssignmentHeading">
        <Translate contentKey="zipcodeoverflowApp.assignment.home.title">Assignments</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="zipcodeoverflowApp.assignment.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/assignment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="zipcodeoverflowApp.assignment.home.createLabel">Create new Assignment</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assignmentList && assignmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('topic')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.topic">Topic</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('topic')} />
                </th>
                <th className="hand" onClick={sort('courseName')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.courseName">Course Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('courseName')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('created')}>
                  <Translate contentKey="zipcodeoverflowApp.assignment.created">Created</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('created')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assignmentList.map((assignment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/assignment/${assignment.id}`} color="link" size="sm">
                      {assignment.id}
                    </Button>
                  </td>
                  <td>{assignment.name}</td>
                  <td>{assignment.topic}</td>
                  <td>{assignment.courseName}</td>
                  <td>{assignment.description}</td>
                  <td>
                    {assignment.created ? <TextFormat type="date" value={assignment.created} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/assignment/${assignment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/assignment/${assignment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/assignment/${assignment.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="zipcodeoverflowApp.assignment.home.notFound">No Assignments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Assignment;
