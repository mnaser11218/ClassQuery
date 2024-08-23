import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './question.reducer';

export const Question = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const questionList = useAppSelector(state => state.question.entities);
  const loading = useAppSelector(state => state.question.loading);

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
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="question-heading" data-cy="QuestionHeading">
        <Translate contentKey="zipcodeoverflowApp.question.home.title">Questions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="zipcodeoverflowApp.question.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/question/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="zipcodeoverflowApp.question.home.createLabel">Create new Question</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {questionList && questionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="zipcodeoverflowApp.question.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="zipcodeoverflowApp.question.title">Title</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('question')}>
                  <Translate contentKey="zipcodeoverflowApp.question.question">Question</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('question')} />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="zipcodeoverflowApp.question.createdDate">Created Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
                </th>
                <th>
                  <Translate contentKey="zipcodeoverflowApp.question.tags">Tags</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="zipcodeoverflowApp.question.answers">Answers</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="zipcodeoverflowApp.question.userProfile">User Profile</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questionList.map((question, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/question/${question.id}`} color="link" size="sm">
                      {question.id}
                    </Button>
                  </td>
                  <td>{question.title}</td>
                  <td>{question.question}</td>
                  <td>
                    {question.createdDate ? <TextFormat type="date" value={question.createdDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {question.tags
                      ? question.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`/tag/${val.id}`}>{val.id}</Link>
                            {j === question.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {question.answers
                      ? question.answers.map((val, j) => (
                          <span key={j}>
                            <Link to={`/answer/${val.id}`}>{val.id}</Link>
                            {j === question.answers.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {question.userProfile ? <Link to={`/user-profile/${question.userProfile.id}`}>{question.userProfile.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/question/${question.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/question/${question.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/question/${question.id}/delete`)}
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
              <Translate contentKey="zipcodeoverflowApp.question.home.notFound">No Questions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Question;
