
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
    Swal.fire("Logged Out", "You have been logged out successfully", "success");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="  shadow-xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.photoURL || user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
            {/* <span className=" "></span> */}
            <div className="inline-grid *:[grid-area:1/1]  rounded-full border-2 border-white absolute bottom-1 right-1 w-4 h-4">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {profile.displayName || user?.displayName}
            </h2>
            <p className="text-gray-500">{profile.email}</p>

            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="badge badge-primary capitalize">
                {profile.role}
              </span>
              <span
                className={`badge ${
                  profile.status === "suspended"
                    ? "badge-error"
                    : "badge-success"
                } capitalize`}
              >
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{profile.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <p className="font-medium capitalize">{profile.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">
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
