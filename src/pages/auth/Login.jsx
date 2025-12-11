import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Login = () => {
     const navigate = useNavigate();
     const useaxios=useAxios()
     const { signinUser, googlePopUp } = use(AuthContext);
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
      const res = await signinUser(data.email, data.password);

      Swal.fire({
        position: "top-center",
        title: "Login Successful",
        icon: "success",
        timer: 1500,
      });

      navigate("/");
      console.log(res.user);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

    const googleLogins=()=>{
      googlePopUp().then(res=>{
        navigate("/")
        Swal.fire({
                      position: "top-end",
                      title: "Login Successfull",
                      icon: "success",
                      timer: 1500,
                    });
        const data = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          role: "borrower",
        };

        useaxios.post("/users",data).then(res=>{
         
          console.log("after submit from login",res)
        }).catch(err=>console.log(err))
      })
    }
    return (
      <div className="min-h-screen flex justify-center items-center  p-4">
        <div
          className="login-box w-full max-w-md p-8 rounded-xl shadow-lg my-12
                   bg-[#155C62] "
        >
          <p className="md:text-4xl text-2xl  text-[#B5F6EB] font-semibold text-center mb-6">
            Login
          </p>

          <form
            onSubmit={handleSubmit(onSubmits)}
            className="space-y-6  p-6 rounded-lg "
          >
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-[#B5F6EB] font-bold mb-1">Email</label>
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

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-[#B5F6EB] font-bold mb-1">Password</label>
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
                className="btn w-full bg-[#86A9AB] hover:bg-[#29A6A6] text-white hover:font-bold hover:text-base"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </button>
              <div className="divider text-[#B5F6EB]">OR</div>
              <button
                onClick={googleLogins}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5] w-full"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p className="text-[#B5F6EB]">
                {" "}
                Dont Have an account?
                <Link className="font-bold hover:underline" to="/register">
                  {" "}
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;