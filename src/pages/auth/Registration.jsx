import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import  axios  from 'axios';
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
const Registration = () => {
const useaxios=useAxios()
  const navigate=useNavigate()
    const { registerUger, updateUser } = use(AuthContext);
   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
     reset,
   } = useForm({
     mode: "onTouched",
   });
 const onSubmits = async (data) => {
  const photo=data.photo[0]
registerUger(data.email, data.password)
  .then((res) => {
    console.log(res.user);

    /* 1 store image  IN FORM DATA*/

    const formData = new FormData();
    formData.append("image", photo);

    /* 2 send the photo and get uri*/
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      )
      .then((res) => {
        const photoURL = res.data.data.url;
        //CREATE USER IN DATABASE
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
          role:data.role
        };
         useaxios.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            navigate("/")
            Swal.fire({
              position: "top-end",
              title: "User Created Successfully",
              icon: "success",
              timer: 1500,
            });
          }
        }); 
        const userprofile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        /* 3 firebase e uri ta diye photoURL upload kroa*/
        updateUser(userprofile)
          .then((res) => console.log("after img upld", res))
          .catch((err) => console.log(err));
      });
  })
  .catch((err) => {
    console.log(err);
  });
    reset(); 
 };
  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <div
        className="login-box w-full max-w-md p-8 rounded-xl shadow-lg my-12
                   bg-[linear-gradient(to_right,#57C4D4,#33b3ac,#29A6A6)]"
      >
        <p className="text-2xl font-semibold text-center mb-6 ">Register</p>

        <form
          onSubmit={handleSubmit(onSubmits)}
          className="space-y-6  p-6 rounded-lg "
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full focus:border-[#57C4D4]"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">name is required</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full focus:border-[#57C4D4]"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              id="photo"
              className="file-input file-input-bordered w-full"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">photo is required</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 font-medium mb-2">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              defaultValue=""
              className="select select-ghost w-full bg-[#57C4D4]"
            >
              <option value="" disabled>
                Pick a role
              </option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full focus:border-[#57C4D4]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
             
              type="submit"
              className="btn w-full bg-[#57C4D4] hover:bg-[#29A6A6] text-white"
            >
            Register
            </button>
            <div className="divider">OR</div>
           
            <p>
              {" "}
              Have an account?<Link to="/login"> Login now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
