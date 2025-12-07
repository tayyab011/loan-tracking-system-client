import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';

const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
   
};

export default PrivateRoute;