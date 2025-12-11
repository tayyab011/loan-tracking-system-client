import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const ApproveLoan = () => {
  const navigate = useNavigate();
  const usesecure = useAxiosSecure();
  const { data: approved = [], refetch } = useQuery({
    queryKey: ["pending-status", "approved"],
    queryFn: async () => {
      const res = await usesecure.get(
        `/loan-application-pendingform?status=approved`
      );
      return res.data;
    },
  });
  
  return (
    <div>
      Approved {approved.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='font-bold'>
            <tr>
              <th>#</th>
              <th>Loan ID</th>
              <th>Borrower Name</th>
              <th>Borrower Email</th>
              <th>Loan Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className='font-bold'>
            {approved?.map((approved, i) => (
              <tr key={approved._id}>
                <th>{i + 1}</th>
                <td>{approved?.loanId?.toString()}</td>
                <td>Quality Control Specialist</td>
                <td>{approved?.borrowerEmail}</td>
                <td>{approved?.loanAmount?.toString()}</td>
                <td>{new Date(approved?.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveLoan;