import React from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import NullData from "../../components/general/NullData";
import DashboardSummary from '../../components/general/DashboardSummary';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    if (!user.isAdmin) {
      return <NullData title={`Oops! Access Denied. You are not an admin.`}/>; 
    }
  return (
    <>
        <DashboardSummary />
    </>
  );
};

export default DashboardPage;
