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
    const { registerUger, updateUser, loading } = use(AuthContext);
   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
     reset,
   } = useForm({
     mode: "onTouched",
   });
const onSubmits = async (data) => {
  try {
    const photo = data.photo[0];

    // 1️⃣ Register user
    const res = await registerUger(data.email, data.password);

    // 2️⃣ Upload image
    const formData = new FormData();
    formData.append("image", photo);

    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
      formData
    );

    const photoURL = imgRes.data.data.url;

    // 3️⃣ Save user in database
    const userInfo = {
      email: data.email,
      displayName: data.name,
      photoURL,
      role: data.role,
    };

    const dbRes = await useaxios.post("/users", userInfo);

    // 4️⃣ Update firebase profile
    await updateUser({
      displayName: data.name,
      photoURL,
    });

    if (dbRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        title: "User Created Successfully",
        icon: "success",
        timer: 1500,
      });

      reset();
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: err.message,
    });
  }
};
 if (loading) {
      return <Loader/>
    }
  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <div
        className="login-box w-full max-w-md p-8 rounded-xl shadow-lg my-12
                   bg-[#155C62]"
      >
        <p className="md:text-4xl text-2xl  text-[#B5F6EB] font-semibold text-center mb-6 ">
          Register
        </p>

        <form
          onSubmit={handleSubmit(onSubmits)}
          className="space-y-6  p-6 rounded-lg "
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-[#B5F6EB] font-bold mb-1">Name</label>
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
            <label className="text-[#B5F6EB] font-bold  mb-1">Email</label>
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
            <label className="text-[#B5F6EB] font-bold mb-1">Photo</label>
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
            <label className="text-[#B5F6EB] font-bold mb-2">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              defaultValue=""
              className="select select-ghost w-full bg-[#155C62] text-[#B5F6EB]"
            >
              <option className="bg-transparent" value="" disabled>
                Pick a role
              </option>
              <option className="bg-transparent" value="borrower">
                Borrower
              </option>
              <option className="bg-transparent" value="manager">
                Manager
              </option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[#B5F6EB] font-bold mb-1">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Password must contain at least 1 uppercase, 1 lowercase letter and be at least 6 characters long",
                },
              })}
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
              disabled={isSubmitting}
              className="btn w-full bg-[#86A9AB] hover:bg-[#29A6A6] text-white hover:font-bold hover:text-base"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
           

            <p className="text-[#B5F6EB]">
              {" "}
              Have an account?
              <Link className="hover:underline font-black" to="/login">
                {" "}
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
