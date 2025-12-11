import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: allApplication = [] } = useQuery({
    queryKey: ["all-loanApplication-for-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-application-form");
      return res.data;
    },
  });

  //  Filter logic
  const filteredApplications =
    statusFilter === "all"
      ? allApplication
      : allApplication.filter((app) => app.status === statusFilter);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Loan Applications ({filteredApplications.length})
      </h2>

      {/*  Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/*  Table */}
      <div className="overflow-x-auto">
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-lg bg-base-200">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              No Loan Applications Found
            </h3>
            <p className="text-sm text-gray-500 mb-4 max-w-sm">
              There are no loan applications matching the selected status.
            </p>
            <button
              onClick={() => setStatusFilter("all")}
              className="btn btn-sm btn-outline"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <table className="table table-zebra">
            <thead className="font-bold">
              <tr>
                <th>#</th>
                <th>Loan ID</th>
                <th>User</th>
                <th>Loan Title</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="font-semibold">
              {filteredApplications.map((app, i) => (
                <tr key={app._id}>
                  <td>{i + 1}</td>
                  <td>{app.loanId}</td>
                  <td>
                    <div>
                      <p className="">
                        {app.firstName} {app.lastName}
                      </p>
                      <p className="text-sm ">
                        {app.borrowerEmail}
                      </p>
                    </div>
                  </td>
                  <td>{app.loanTitle}</td>
                  <td>${app.loanAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "pending"
                          ? "badge-warning"
                          : app.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] font-semibold text-white hover:scale-105 transition duration-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/*  View Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#155C62] text-[#B5F6EB] p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Application Details</h3>

            <p>
              <b>Name:</b> {selectedApp.firstName} {selectedApp.lastName}
            </p>
            <p>
              <b>Email:</b> {selectedApp.borrowerEmail}
            </p>
            <p>
              <b>Loan:</b> {selectedApp.loanTitle}
            </p>
            <p>
              <b>Amount:</b> ${selectedApp.loanAmount}
            </p>
            <p>
              <b>Status:</b> {selectedApp.status}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
