import React from 'react';
import { Outlet } from 'react-router-dom';

const ClientLayout = ({ children }) => (
  <div className="dashboard-layout">
    <div className="dashboard-content">{children}</div>
  </div>
);

const ClientRoutes = () => (
  <ClientLayout>
    <Outlet />
  </ClientLayout>
);

export default ClientRoutes; 