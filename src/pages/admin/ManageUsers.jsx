import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUpdateRole = async (e) => {
    e.preventDefault()
 const role =e.target.role.value
 const status = e.target.status.value;
/*  console.log(role,status) */
 const res= await axiosSecure.put(`/users-manage/${selectedUser._id}`, {
    role: role,
    status: status,
  });
if (res.data.acknowledged) {
  Swal.fire("Role and Status updated successfull");
  
}
    setSelectedUser(null);
    refetch(); 
  /*   console.log(selectedUser.role);  */
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra ">
          <thead className=" font-bold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="font-semibold">
            {users.length === 0 && <p>No users Found</p>}
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user?.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "pending"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Modal ===== */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateRole}
            className="bg-[#155C62] p-6 rounded-md w-80 text-[#B5F6EB]"
          >
            <h3 className="font-semibold mb-3">Update User</h3>

            {/* Role */}
            <label className="block mb-2 text-sm">Role</label>
            <select
              name="role"
              defaultValue={selectedUser?.role}
              className="select select-bordered w-full mb-3 bg-[#155C62] text-[#B5F6EB]"
            >
              <option className=" bg-transparent" value="borrower">
                Borrower
              </option>
              <option className=" bg-transparent" value="manager">
                Manager
              </option>
              <option className=" bg-transparent" value="admin">
                Admin
              </option>
            </select>

            {/* Status */}
            <label className="block mb-2 text-sm">Status</label>
            <select
              name="status"
              className="select select-bordered w-full mb-4 bg-[#155C62] text-[#B5F6EB]"
            >
              {" "}
              <option className=" bg-transparent" disabled={true}>
                select a role
              </option>
              <option className=" bg-transparent" value="approved">
                Approved
              </option>
              <option className=" bg-transparent" value="suspended">
                Suspended
              </option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-error btn-md border-none font-semibold text-white hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
