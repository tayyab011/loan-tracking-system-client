import { useQuery } from "@tanstack/react-query";

import { use } from "react";

import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";

const MyLoan = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: myLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loan-application-form?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Loan?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (result.isConfirmed) {
      
      const res = await axiosSecure.put(
        `/loan-application-form/status-canceled/${id}`
      );
     
      Swal.fire("Cancelled", "Loan application cancelled", "success");
      refetch();
    }
  };

  const handlePayment=async(loan)=>{
const paymentInfo = {
  loanApplicationsId: loan._id,
  loanId: loan.loanId,
  loanTitle: loan.loanTitle,
  borrowerName: loan.borrowerName,
  borrowerEmail: loan.borrowerEmail,
  price:loan.price
};
 const res =await axiosSecure.post("/create-checkout-session", paymentInfo);
 
 window.location.href = res.data.url;
  }
  if (isLoading) {return <p className="text-center mt-10">Loading...</p>};

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans ({myLoans.length})</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myLoans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>

                <td>
                  <p className="font-semibold">{loan.loanTitle}</p>
                  <p className="text-sm text-gray-500">
                    Interest: {loan.interestRate}%
                  </p>
                  <p className="text-xs text-gray-400">
                    Applied: {new Date(loan.appliedAt).toLocaleDateString()}
                  </p>
                </td>

                <td>৳ {loan.loanAmount}</td>

                <td>
                  <span
                    className={`badge ${
                      loan.status === "approved"
                        ? "badge-success"
                        : loan.status === "rejected"
                        ? "badge-error"
                        : loan.status === "canceled"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* View */}
                  <Link
                    to={`/loan/${loan.loanId}`}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </Link>

                  {/* ✅ PAID */}
                  {loan.applicationFeeStatus === "paid" && (
                    <span className="badge badge-success">Paid</span>
                  )}

                  {/* ❌ CANCELLED + NEW PAYMENT */}
                  {loan.status === "canceled" &&
                    loan.applicationFeeStatus !== "paid" && (
                      <>
                      {/*   <span className="badge badge-error">Cancelled</span> */}

                        {/* <button
                          onClick={() => handlePayment(loan)}
                          className="btn btn-xs btn-primary"
                        >
                          New Payment
                        </button> */}
                      </>
                    )}

                  {/* 💳 PAY */}
                  {loan.status !== "canceled" &&
                    loan.applicationFeeStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayment(loan)}
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </button>
                    )}

                  {/* ❌ CANCEL (only when unpaid) */}
                  {loan.status === "pending" &&
                    loan.applicationFeeStatus !== "paid" && (
                      <button
                        onClick={() => handleCancel(loan._id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myLoans.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No loan applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLoan;
