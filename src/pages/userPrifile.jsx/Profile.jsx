
import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, logout } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: profile = {} } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const handleLogout = async () => {
    await logout();
   
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className=" bg-[#155C62] text-[#B5F6EB] shadow-xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.photoURL || user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[#B5F6EB] object-cover"
            />
            {/* <span className=" "></span> */}
            <div className="inline-grid *:[grid-area:1/1]  rounded-full  absolute bottom-1 right-1 w-4 h-4">
              <div className="status status-success animate-ping w-3 h-3 rounded-full"></div>
              <div className="status status-success w-3 h-3"></div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {profile.displayName || user?.displayName}
            </h2>
            <p className="text-[#B5F6EB]">{profile.email}</p>

            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="badge bg-[#1F887A] border-0 font-bold text-[#B5F6EB] capitalize">
                {profile.role}
              </span>
              <span
                className={`badge ${
                  profile.status === "suspended"
                    ? "badge-error"
                    : "bg-[#B5F6EB] shadow-sm shadow-[#B5F6EB] text-black font-bold"
                } capitalize`}
              >
                {profile.status || "pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#B5F6EB]">Email</p>
            <p className="font-bold">{profile?.email}</p>
          </div>

          <div>
            <p className="text-sm text-[#B5F6EB]">Role</p>
            <p className="font-bold capitalize">{profile.role}</p>
          </div>

          <div>
            <p className="text-sm text-[#B5F6EB]">Account Status</p>
            <p className="font-bold capitalize">{profile.status}</p>
          </div>

          <div>
            <p className="text-sm text-[#B5F6EB]">Joined</p>
            <p className="font-bold">
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-right">
          <button onClick={handleLogout} className="btn btn-error px-8">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
