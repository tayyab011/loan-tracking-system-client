import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';

import { Navigate } from 'react-router';
import Loader from '../components/Loader';

const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    if (loading) {
        return <Loader/>
    }else if (!user) {
     return <Navigate /* tate={location.pathname} */ to="/login" />;
   }
   return children
};

export default PrivateRoute;