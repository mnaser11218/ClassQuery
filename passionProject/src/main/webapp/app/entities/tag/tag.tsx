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

import { getEntities } from './tag.reducer';

export const Tag = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const tagList = useAppSelector(state => state.tag.entities);
  const loading = useAppSelector(state => state.tag.loading);

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
      <h2 id="tag-heading" data-cy="TagHeading">
        <Translate contentKey="zipcodeoverflowApp.tag.home.title">Tags</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="zipcodeoverflowApp.tag.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/tag/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="zipcodeoverflowApp.tag.home.createLabel">Create new Tag</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tagList && tagList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('tagName')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.tagName">Tag Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('tagName')} />
                </th>
                <th className="hand" onClick={sort('tagDescription')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.tagDescription">Tag Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('tagDescription')} />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.createdDate">Created Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
                </th>
                <th className="hand" onClick={sort('labName')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.labName">Lab Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('labName')} />
                </th>
                <th className="hand" onClick={sort('labTopic')}>
                  <Translate contentKey="zipcodeoverflowApp.tag.labTopic">Lab Topic</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('labTopic')} />
                </th>
                <th>
                  <Translate contentKey="zipcodeoverflowApp.tag.questions">Questions</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tagList.map((tag, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/tag/${tag.id}`} color="link" size="sm">
                      {tag.id}
                    </Button>
                  </td>
                  <td>{tag.tagName}</td>
                  <td>{tag.tagDescription}</td>
                  <td>{tag.createdDate ? <TextFormat type="date" value={tag.createdDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{tag.labName}</td>
                  <td>{tag.labTopic}</td>
                  <td>
                    {tag.questions
                      ? tag.questions.map((val, j) => (
                          <span key={j}>
                            <Link to={`/question/${val.id}`}>{val.id}</Link>
                            {j === tag.questions.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/tag/${tag.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/tag/${tag.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/tag/${tag.id}/delete`)}
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
              <Translate contentKey="zipcodeoverflowApp.tag.home.notFound">No Tags found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Tag;
