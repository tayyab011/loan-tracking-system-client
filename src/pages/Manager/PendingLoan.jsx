import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PendingLoan = () => {
    const navigate=useNavigate()
    const usesecure=useAxiosSecure()
    const {data :pending=[],refetch}=useQuery({
        queryKey:["pending-status","pending"],
        queryFn:async()=>{
            const res = await usesecure.get(`/loan-application-pendingform?status=pending`
            );
            return res.data;
        }
    })
    const updatestatus=async(id,status)=>{
        const data={
            status :status
        }
        const res = await usesecure.put(
          `/loan-application-form-manager/${id}`,
          data
        );
       if (res.data.acknowledged) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your status is ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
       }
    }
    const handleApprove = (id,status) => {
      updatestatus(id,status)
    };
    const handleReject=(id,status)=>{
updatestatus(id,status)
    }
    return (
      <div>
        PendingLoan {pending.length}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Loan ID</th>
                <th>Borrower Name</th>
                <th>Borrower Email</th>
                <th>Loan Amount</th>
                <th>Payment Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pending?.map((pending, i) => (
                <tr key={pending._id}>
                  <th>{i + 1}</th>
                  <td>{pending?.loanId?.toString()}</td>
                  <td>Quality Control Specialist</td>
                  <td>{pending?.borrowerEmail}</td>
                  <td>{pending?.loanAmount?.toString()}</td>
                  <td>{pending?.applicationFeeStatus}</td>
                  <td>{new Date(pending?.appliedAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApprove(pending._id, "approved")}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(pending._id, "rejected")}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => navigate(`/loan/${pending?.loanId}`)}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PendingLoan;