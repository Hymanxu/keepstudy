import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefaultWorkspacePage from './DefaultWorkspacePage';
import CourseWorkspacePage from './CourseWorkspacePage';
import PracticeWorkspacePage from './PracticeWorkspacePage';

const WorkspaceRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultWorkspacePage />} />
      <Route path="/course/:courseId" element={<CourseWorkspacePage />} />
      <Route path="course/:courseId" element={<CourseWorkspacePage />} />
      <Route path="/practice/:courseId" element={<PracticeWorkspacePage />} />
      <Route path="practice/:courseId" element={<PracticeWorkspacePage />} />
      <Route path="*" element={<Navigate to="/workspace" replace />} />
    </Routes>
  );
};

export default WorkspaceRouter;
