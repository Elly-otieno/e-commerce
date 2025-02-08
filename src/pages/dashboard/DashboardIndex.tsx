import React from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import NullData from "../../components/general/NullData";

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    if (!user.isAdmin) {
      return <NullData title='Oops! Access Denied'/>; 
    }
  return (
    <div className=''>

    </div>
  );
};

export default DashboardPage;
