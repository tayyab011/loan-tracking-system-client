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
        <h1 className="text-2xl md:text-4xl font-bold my-5">
          {" "}
          PendingLoan {pending.length}
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="font-bold">
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
            <tbody className="font-bold">
              {pending?.map((pending, i) => (
                <tr key={pending._id}>
                  <th>{i + 1}</th>
                  <td>{pending?.loanId?.toString()}</td>
                  <td>Quality Control Specialist</td>
                  <td>{pending?.borrowerEmail}</td>
                  <td>{pending?.loanAmount?.toString()}</td>
                  <td
                    className={`${
                      pending?.applicationFeeStatus === "unpaid" &&
                      "text-red-400"
                    } ${
                      pending?.applicationFeeStatus === "paid" &&
                      "text-[#1F887A]"
                    }`}
                  >
                    {pending?.applicationFeeStatus}
                  </td>
                  <td>{new Date(pending?.appliedAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApprove(pending._id, "approved")}
                      className="btn btn-sm md:btn-md border-none bg-[#1F887A] hover:bg-[#159281] font-semibold text-white hover:scale-105 transition duration-300"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(pending._id, "rejected")}
                      className="btn btn-sm md:btn-md btn-error border-none  font-semibold text-white hover:scale-105 transition duration-300"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => navigate(`/loan/${pending?.loanId}`)}
                      className="btn btn-sm md:btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
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