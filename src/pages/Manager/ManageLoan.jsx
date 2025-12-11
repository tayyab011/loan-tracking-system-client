import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const ManageLoan = () => {
  const [modal, setModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const useaxiosSecure = useAxiosSecure();

  const { data: manageLoan = [],refetch } = useQuery({
    queryKey: ["manage-loan"],
    queryFn: async () => {
      const res = await useaxiosSecure.get("/loans");
      return res.data;
    },
  });

  const updateLoan = (loan) => {
    setModal(loan);
    setSelectedImage(loan.image);
  };

  const {
    register,
    handleSubmit,
    formState: { errors  ,isSubmitting},
  } = useForm({ mode: "onTouched" });

  const onLoanSubmit = async (data) => {
    let loanImg = selectedImage; // আগের image

    // যদি নতুন image select করা হয়
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgdata = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );
      loanImg = imgdata.data.data.url;
    }

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
    };

    const res = await useaxiosSecure.put(`/loans/${modal._id}`, loanDatas);
    if (res.data.acknowledged) {
         Swal.fire({
                           position: "top-end",
                           title: "Loan Updated Successfull",
                           icon: "success",
                           timer: 1500,
                         });
    }
    console.log("Updated Loan:", res);
    setModal(null);
  };
const deleteLoan=(id)=>{
Swal.fire({
  title: "Are you sure?",
 
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
}).then(async (result) => {
  if (result.isConfirmed) {
const res = await useaxiosSecure.delete(`/loans/${id}`)
console.log(res)
if (res.data.acknowledged) {
  refetch();
   Swal.fire({
     title: "Deleted!",
     text: "Your loan data has been deleted.",
     icon: "success",
   });
}

    /* */
  }
});
}
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold">
        Manage Loan ({manageLoan.length})
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full min-w-[800px]">
          <thead className="font-bold">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Interest</th>
              <th>Max Limit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {manageLoan.map((loan, index) => (
              <tr
                key={loan._id}
                className={`${index % 2 === 0 ? "hover:bg-base-300" : null}`}
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={loan.image}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{loan.title}</td>
                <td>{loan.category}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.maxLoanLimit}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => updateLoan(loan)}
                    className="btn btn-sm md:btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteLoan(loan._id)}
                    className="btn btn-sm md:btn-md btn-error border-none font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal && (
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box max-w-3xl bg-[#155C62]">
              <h3 className="font-bold text-xl md:text-2xl mb-4 text-[#B5F6EB]">
                Update Loan
              </h3>

              <form onSubmit={handleSubmit(onLoanSubmit)} className="space-y-4">
                {/* Loan Title */}
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-[#B5F6EB]">
                      Loan Title *
                    </span>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    defaultValue={modal.title}
                    className="input input-bordered w-full"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">Title is required</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-[#B5F6EB]">
                      Description *
                    </span>
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    defaultValue={modal.description}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      Description is required
                    </p>
                  )}
                </div>

                {/* Category | Interest | Max Limit */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-[#B5F6EB]">
                        Category
                      </span>
                    </label>
                    <div>
                      <input
                        {...register("category", { required: true })}
                        defaultValue={modal.category}
                        className="input input-bordered"
                        placeholder="Category"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-[#B5F6EB]">
                        Interest Rate (%)
                      </span>
                    </label>
                    <input
                      {...register("interestRate", { required: true })}
                      defaultValue={modal.interestRate}
                      className="input input-bordered"
                      placeholder="Interest Rate (%)"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-[#B5F6EB]">
                        Max Loan Limit
                      </span>
                    </label>
                    <input
                      {...register("maxLoanLimit", { required: true })}
                      defaultValue={modal.maxLoanLimit}
                      className="input input-bordered"
                      placeholder="Max Loan Limit"
                    />
                  </div>
                </div>

                {/* Required Documents */}
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-[#B5F6EB]">
                      Required Documents
                    </span>
                  </label>
                  <input
                    {...register("requiredDocuments", { required: true })}
                    defaultValue={modal.requiredDocuments}
                    className="input input-bordered w-full"
                    placeholder="NID, Passport, Bank Statement"
                  />
                  {errors.requiredDocuments && (
                    <p className="text-red-500 text-sm">
                      Required Documents are required
                    </p>
                  )}
                </div>

                {/* EMI Plans */}
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-[#B5F6EB]">
                      EMI Plans
                    </span>
                  </label>
                  <input
                    {...register("emiPlans")}
                    defaultValue={modal.emiPlans}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-[#B5F6EB]">
                      Image
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="input input-bordered cursor-pointer w-full"
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      className="w-24 h-24 object-cover mt-2 rounded"
                    />
                  )}
                </div>

                {/* Show on Home toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    {...register("showOnHome")}
                    defaultChecked={modal.showOnHome}
                    className="toggle toggle-success"
                  />
                  <span>Show on Home</span>
                </div>

                {/* Submit buttons */}
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    {isSubmitting ? "Loading..." : "Save Loan"}
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ManageLoan;
