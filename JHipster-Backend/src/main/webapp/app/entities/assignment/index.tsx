import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Assignment from './assignment';
import AssignmentDetail from './assignment-detail';
import AssignmentUpdate from './assignment-update';
import AssignmentDeleteDialog from './assignment-delete-dialog';

const AssignmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Assignment />} />
    <Route path="new" element={<AssignmentUpdate />} />
    <Route path=":id">
      <Route index element={<AssignmentDetail />} />
      <Route path="edit" element={<AssignmentUpdate />} />
      <Route path="delete" element={<AssignmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssignmentRoutes;
