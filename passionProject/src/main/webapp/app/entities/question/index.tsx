import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Question from './question';
import QuestionDetail from './question-detail';
import QuestionUpdate from './question-update';
import QuestionDeleteDialog from './question-delete-dialog';

const QuestionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Question />} />
    <Route path="new" element={<QuestionUpdate />} />
    <Route path=":id">
      <Route index element={<QuestionDetail />} />
      <Route path="edit" element={<QuestionUpdate />} />
      <Route path="delete" element={<QuestionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default QuestionRoutes;
