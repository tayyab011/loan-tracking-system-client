import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllLoan = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading loans...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Loans</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div key={loan._id} className="card bg-base-100 shadow-md border">
            <figure className="h-48">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{loan.title}</h3>

              <p className="text-sm text-gray-500">Category: {loan.category}</p>

              <div className="text-sm space-y-1">
                <p>Interest: {loan.interestRate}%</p>
                <p>Max Limit: ৳{loan.maxLoanLimit}</p>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/loan/${loan._id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLoan;
