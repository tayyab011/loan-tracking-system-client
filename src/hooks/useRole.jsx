import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthContext';

const useRole = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=use(AuthContext)
    const { isLoading,data: role = "borrower" } = useQuery({
      queryKey: ["role"],
      queryFn: async () => {
        const res = await axiosSecure(`/users/${user?.email}/role`);
        console.log(res.data);
        return res.data.role;
      },
    });
     return { role, isLoading };
   
};

export default useRole;