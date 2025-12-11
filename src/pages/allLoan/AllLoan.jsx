import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../components/Loader";

const AllLoan = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6; 

  const { data: loansData = { loans: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["all-loans", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-loans?page=${page}&limit=${limit}`
      );
      return res.data; 
    },
  });

  const totalPages = Math.ceil(loansData.total / limit);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-5xl text-[#1F887A] font-bold mb-6 text-center">
        All Loans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loansData.loans.map((loan) => (
          <div
            key={loan._id}
            className="card bg-[#155C62] text-[#B5F6EB] shadow-md border"
          >
            <figure className="h-48">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{loan.title}</h3>

              <p className="text-sm">Category: {loan.category}</p>

              <div className="text-sm space-y-1">
                <p>Interest: {loan.interestRate}%</p>
                <p>Max Limit: ৳{loan.maxLoanLimit}</p>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/loan/${loan._id}`}
                  className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-sm bg-[#1F887A] text-white hover:bg-[#29A6A6]"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${
              page === i + 1
                ? "bg-[#29A6A6] text-white"
                : "bg-[#86A9AB] text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="btn btn-sm bg-[#1F887A] text-white hover:bg-[#29A6A6]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllLoan;
