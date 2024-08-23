import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Answer from './answer';
import AnswerDetail from './answer-detail';
import AnswerUpdate from './answer-update';
import AnswerDeleteDialog from './answer-delete-dialog';

const AnswerRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Answer />} />
    <Route path="new" element={<AnswerUpdate />} />
    <Route path=":id">
      <Route index element={<AnswerDetail />} />
      <Route path="edit" element={<AnswerUpdate />} />
      <Route path="delete" element={<AnswerDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AnswerRoutes;
