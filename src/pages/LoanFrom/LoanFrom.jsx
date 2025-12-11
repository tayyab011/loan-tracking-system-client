import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { use } from "react";

const LoanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data.find((l) => l._id === id);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const onSubmit = async (data) => {
    const applicationData = {
      borrowerEmail: user.email,
      borrowerName: user.displayName,
      loanId: loan._id,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      ...data,
      monthlyIncome: parseInt(data.monthlyIncome),
      loanAmount: parseInt(data.loanAmount),
      status: "pending",
      applicationFeeStatus: "unpaid",
      appliedAt: new Date(),
    };

    const res = await axiosSecure.post(
      "/loan-application-form",
      applicationData
    );

    if (res.data.insertedId) {
      Swal.fire("Success", "Loan application submitted", "success");
      navigate("/all-loan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        Loan Application
      </h2>

      {/* Display All Errors at Top */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          <h4 className="font-semibold mb-2">
            Please fix the following errors:
          </h4>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Auto-filled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            value={loan?.title}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            value={`${loan?.interestRate}%`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("firstName", { required: "First Name is required" })}
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact & NID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("contactNumber", {
              required: "Contact Number is required",
            })}
            placeholder="Contact Number"
            className="input input-bordered w-full"
          />
          <input
            {...register("nid", {
              required: "NID / Passport Number is required",
            })}
            placeholder="NID / Passport Number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("incomeSource", {
              required: "Income Source is required",
            })}
            placeholder="Income Source"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("monthlyIncome", {
              required: "Monthly Income is required",
            })}
            placeholder="Monthly Income"
            className="input input-bordered w-full"
          />
        </div>

        {/* Loan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="number"
            {...register("loanAmount", { required: "Loan Amount is required" })}
            placeholder="Loan Amount"
            className="input input-bordered w-full"
          />
          <input
            {...register("reason", { required: "Reason For Loan is required" })}
            placeholder="Reason for Loan"
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div>
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Notes */}
        <textarea
          {...register("notes", { required: "Notes are required" })}
          placeholder="Extra Notes"
          className="textarea textarea-bordered font-bold w-full placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="btn btn-md border-none bg-[#86A9AB] w-full md:w-auto block mx-auto hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
