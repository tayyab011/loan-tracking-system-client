import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

  // ✅ Delete loan
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/loan/${id}`);
        refetch();
        Swal.fire("Deleted!", "Loan has been deleted.", "success");
      }
    });
  };

  // ✅ Toggle show on home
  const toggleShowHome = async (loan) => {
    await axiosSecure.patch(`/loan/${loan._id}`, {
      showOnHome: !loan.showOnHome,
    });
    refetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        All Loans ({loans.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
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

          <tbody>
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
                    checked={loan.showOnHome}
                    onChange={() => toggleShowHome(loan)}
                    className="toggle toggle-success"
                  />
                </td>

                <td className="space-x-2">
                  <button className="btn btn-xs btn-info">Update</button>

                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoans;
