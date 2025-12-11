import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AllLoans = () => {
     const [modal, setModal] = useState(null);
      const [selectedImage, setSelectedImage] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
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
      formState: { errors ,isSubmitting},
    } = useForm({ mode: "onTouched" });
  //  Delete loan
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/loansDelete/${id}`);
        refetch();
        Swal.fire("Deleted!", "Loan has been deleted.", "success");
      }
    });
  };

  //  Toggle show on home
  const toggleShowHome = async (loan) => {
   const res= await axiosSecure.put(`/loan-admin-showonhome/${loan._id}`, {
      showOnHome: !loan.showOnHome,
    });
    console.log(res)
    refetch();
  };
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
      image: loanImg, // আগের বা নতুন image
      showOnHome: data.showOnHome,
    };

    const res = await axiosSecure.put(`/loans/${modal._id}`, loanDatas);
    if (res.data.acknowledged) {
        refetch()
         Swal.fire({
                           position: "top-end",
                           title: "Loan Updated Successfull",
                           icon: "success",
                           timer: 1500,
                         });
    }
 /*    console.log("Updated Loan:", res); */
    setModal(null);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        All Loans ({loans.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className=" font-black">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="font-semibold">
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={loan.image}
                    alt="loan"
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td>{loan?.createdBy?.creatorName}</td>

                <td>
                  <input
                    type="checkbox"
                    defaultChecked={loan.showOnHome}
                    onChange={() => toggleShowHome(loan)}
                    className="toggle toggle-success"
                  />
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => updateLoan(loan)}
                    className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-md btn-error border-none  font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal && (
          <dialog id="my_modal_3" className="modal modal-open ">
            <div className="modal-box bg-[#155C62] ">
              <form onSubmit={handleSubmit(onLoanSubmit)} className="space-y-4">
                {/* Loan Title */}
                <div>
                  <label className="label">
                    <span className="label-text text-[#B5F6EB]">
                      Loan Title *
                    </span>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    defaultValue={modal.title}
                    className="input input-bordered w-full "
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">Title is required</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="label">
                    <span className="label-text text-[#B5F6EB]">
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
                    {" "}
                    <label className="label text-[#B5F6EB]">
                      <span className="label-text">Category *</span>
                    </label>
                    <input
                      {...register("category", { required: true })}
                      defaultValue={modal.category}
                      className="input input-bordered"
                      placeholder="Category"
                    />
                  </div>
                  <div>
                    <label className="label text-[#B5F6EB]">
                      <span className="label-text">Interest Rate *</span>
                    </label>
                    <input
                      {...register("interestRate", { required: true })}
                      defaultValue={modal.interestRate}
                      className="input input-bordered"
                      placeholder="Interest Rate (%)"
                    />
                  </div>

                  <div>
                    <label className="label text-[#B5F6EB]">
                      <span className="label-text">Max Loan Limit*</span>
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
                  <label className="label text-[#B5F6EB]">
                    <span className="label-text">Required Documents</span>
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
                  <label className="label text-[#B5F6EB]">
                    <span className="label-text">EMI Plans</span>
                  </label>
                  <input
                    {...register("emiPlans")}
                    defaultValue={modal.emiPlans}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="label text-[#B5F6EB]">
                    <span className="label-text">Image</span>
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
                    className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    {isSubmitting ? "Updating....." : "Update"}
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

export default AllLoans;
