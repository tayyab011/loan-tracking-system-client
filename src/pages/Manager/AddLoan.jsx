import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddLoan = () => {
    const useaxiosSecure=useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    mode: "onTouched",
  });



  const onSubmits = async (data) => {
    console.log("Form Data:", data);
    const image = data.image[0]
    console.log(image)
    const formData=new FormData();
    formData.append("image",image);
  const imgdata= await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,formData)

     const loanImg=imgdata.data.data.url;
     const loanDatas = {
       title: data.title,
       description: data.description,
       category: data.category,
       interestRate: parseInt(data.interestRate),
       maxLoanLimit: parseInt(data.maxLoanLimit),
       requiredDocuments: data.requiredDocuments,
       emiPlans: data.emiPlans,
       image: loanImg,
       showOnHome: data.showOnHome,
       date: data.date,
     };
     const res = await useaxiosSecure.post(`/loans`, loanDatas);
    if (res.data.acknowledged) {
      Swal.fire({
                   position: "top-end",
                   title: "User Created Successfully",
                   icon: "success",
                   timer: 1500,
                 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Loan</h2>

      <form onSubmit={handleSubmit(onSubmits)} className="space-y-6">
        {/* Loan Title */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Loan Title *</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Micro Business Loan"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Description *</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Loan description"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Category / Interest / Max Limit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <input
              {...register("category", { required: "Category required" })}
              className="input input-bordered w-full"
              placeholder="Business / Personal"
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Interest Rate (%) *</span>
            </label>
            <input
              {...register("interestRate", {
                required: "Interest rate required",
              })}
              className="input input-bordered w-full"
              placeholder="12"
            />
            {errors.interestRate && (
              <p className="text-sm text-red-500">
                {errors.interestRate.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Max Loan Limit *</span>
            </label>
            <input
              {...register("maxLoanLimit", {
                required: "Max limit required",
              })}
              className="input input-bordered w-full"
              placeholder="50000"
            />
            {errors.maxLoanLimit && (
              <p className="text-sm text-red-500">
                {errors.maxLoanLimit.message}
              </p>
            )}
          </div>
        </div>

        {/* Required Documents */}
        <div>
          <label className="label">
            <span className="label-text">Required Documents</span>
          </label>
          <input
            {...register("requiredDocuments", {
              required: "Required document is mandatory",
            })}
            className="input input-bordered w-full"
            placeholder="NID , TreadLicens , National id , ...(use comma)"
          />
          {errors.requiredDocuments && (
            <p className="text-sm text-red-500">
              {errors.requiredDocuments.message}
            </p>
          )}
        </div>

        {/* EMI Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {" "}
          <div>
            {" "}
            <label className="label">
              <span className="label-text">Emi Plans for loans</span>
            </label>
            <input
              {...register(`emiPlans`, {
                required: "emi required",
              })}
              className="input input-bordered col-span-7"
              placeholder="9 month / 10 month etc.."
            />
            {errors.emiPlans && (
              <p className="text-sm text-red-500">{errors.emiPlans.message}</p>
            )}
          </div>
          <div>
            {" "}
            <label className="label">
              <span className="label-text">Image for loans</span>
            </label>
            <input
              type="file"
              {...register(`image`, {
                required: "Image required",
              })}
              className="input input-bordered col-span-7 cursor-pointer"
              placeholder="image"
            />
            {errors.emiPlans && (
              <p className="text-sm text-red-500">{errors.emiPlans.message}</p>
            )}
          </div>
        </div>
        {/* Show on Home */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("showOnHome")}
            className="toggle toggle-primary"
          />
          <span>Show on Home</span>
        </div>

        {/* Date */}
        <div>
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="text"
            {...register("date")}
            disabled
            value={new Date().toLocaleString()}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            {isSubmitting ? "Adding..." : "Add Loan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLoan;
