import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";


import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { use } from "react";

const LoanFrom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  // ✅ fetch loan info
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

      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      nid: data.nid,
      incomeSource: data.incomeSource,
      monthlyIncome: parseInt(data.monthlyIncome),
      loanAmount: parseInt(data.loanAmount),
      reason: data.reason,
      address: data.address,
      notes: data.notes,

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
if (isLoading) {
    return "loading...."
}
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Loan Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Auto-filled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={user?.email} readOnly className="input input-bordered" />
          <input value={loan?.title} readOnly className="input input-bordered" />
          <input
            value={`${loan?.interestRate}%`}
            readOnly
            className="input input-bordered"
          />
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="input input-bordered"
          />
          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="input input-bordered"
          />
        </div>

        {/* Contact & NID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("contactNumber", { required: true })}
            placeholder="Contact Number"
            className="input input-bordered"
          />
          <input
            {...register("nid", { required: true })}
            placeholder="NID / Passport Number"
            className="input input-bordered"
          />
        </div>

        {/* Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            {...register("incomeSource", { required: true })}
            placeholder="Income Source"
            className="input input-bordered"
          />
          <input
            type="number"
            {...register("monthlyIncome", { required: true })}
            placeholder="Monthly Income"
            className="input input-bordered"
          />
        </div>

        {/* Loan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="number"
            {...register("loanAmount", { required: true })}
            placeholder="Loan Amount"
            className="input input-bordered"
          />
          <input
            {...register("reason", { required: true })}
            placeholder="Reason for Loan"
            className="input input-bordered"
          />
        </div>

        {/* Address */}
        <textarea
          {...register("address", { required: true })}
          placeholder="Address"
          className="textarea textarea-bordered w-full"
        />

        {/* Notes */}
        <textarea
          {...register("notes")}
          placeholder="Extra Notes (optional)"
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanFrom;
