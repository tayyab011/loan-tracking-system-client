import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';
import useRole from '../hooks/useRole';
import Loader from '../components/Loader';

const AdminRoute = ({children}) => {
    const { role, isLoading } = useRole();
    const { user, loading } = use(AuthContext);
    if (loading || isLoading || !user) {
      return <Loader />;
    }
    if (role !== "admin") {
      return "forbidden";
    }

    return children;
};

export default AdminRoute;