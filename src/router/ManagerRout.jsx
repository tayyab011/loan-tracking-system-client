import React, { use } from 'react';
import useRole from '../hooks/useRole';
import { AuthContext } from '../provider/AuthContext';
import Loader from '../components/Loader';

const ManagerRout = ({children}) => {
    const {role,isLoading}=useRole();
    const {user,loading}=use(AuthContext)
     if (loading || isLoading || !user) {
      return <Loader/>;
    }
    if (role !== "manager") {
      return "forbidden";
    }

    return children;
}
export default ManagerRout;