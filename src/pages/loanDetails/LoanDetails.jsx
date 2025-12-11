import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";



import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";
import useRole from "../../hooks/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const  {role}  = useRole(); // admin | manager | user

  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data.find((l) => l._id === id);
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading loan details...</div>;
  }

  if (!loan) {
    return <div className="text-center py-10">Loan not found</div>;
  }

  const isApplyDisabled = !user || role === "admin" || role === "manager";

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/apply-loan/${loan._id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card bg-[#155C62] text-[#B5F6EB] shadow-xl border">
        {/* Image */}
        <figure className="h-72">
          <img
            src={loan.image}
            alt={loan.title}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold">{loan.title}</h2>

          {/* Description */}
          <p className="">{loan.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p>
              <strong>Category:</strong> {loan.category}
            </p>
            <p>
              <strong>Interest Rate:</strong> {loan.interestRate}%
            </p>
            <p>
              <strong>Max Loan Limit:</strong> ৳{loan.maxLoanLimit}
            </p>
            <p>
              <strong>EMI Plans:</strong> {loan.emiPlans}
            </p>
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            {isApplyDisabled ? (
              <button
                disabled={isApplyDisabled}
                className={`btn btn-primary w-full ${
                  isApplyDisabled ? "btn-disabled" : ""
                }`}
              >
                Disabled
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={isApplyDisabled}
                className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
              >
                Apply Now
              </button>
            )}
            {/* <button
              onClick={handleApply}
              disabled={isApplyDisabled}
              className={`btn btn-primary w-full ${
                isApplyDisabled ? "btn-disabled" : ""
              }`}
            >
              {isApplyDisabled ? "Disabled" : " Apply Now"}
            </button> */}

            {/*  {!user && (
              <p className="text-xs text-red-500 mt-2">
                Please login to apply for this loan
              </p>
            )} */}
            {(role === "admin" || role === "manager") && (
              <p className="text-xs text-red-500 mt-2">
                Admin/Manager cannot apply for loans Application Form
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
