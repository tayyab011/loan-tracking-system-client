import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AvailableLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [] } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/homes");
      return res.data;
    },
  });

  return (
    <div className="py-12 w-11/12 mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">Available Loans</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loans.map((loan) => (
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

              <p className="text-sm ">Category: {loan.category}</p>

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
    </div>
  );
};

export default AvailableLoans;
