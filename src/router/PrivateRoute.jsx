import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';
import Loader from '../components/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    if (loading) {
        return <Loader/>
    }
   if (!user) {
     return <Navigate s/* tate={location.pathname} */ to="/login" />;
   }
   return children
};

export default PrivateRoute;