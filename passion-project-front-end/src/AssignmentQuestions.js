import React from 'react'
import { useParams } from 'react-router-dom';
function AssignmentQuestions() {
    const params = useParams();
    const assignmentId = params.id;
  return (
    <div>AssignmentQuestion id : {assignmentId} </div>
  )
}

export default AssignmentQuestions