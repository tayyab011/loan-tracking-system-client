import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PendingLoan = () => {
    const usesecure=useAxiosSecure()
    const {}=useQuery({
        queryKey:["pending-status"],
        queryFn:async()=>{
            const res = await usesecure.get(`/`)
        }
    })
    return <div>PendingLoan PendingLoan</div>;
};

export default PendingLoan;