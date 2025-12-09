import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccessFull = () => {
    const axiosSecure=useAxiosSecure()
    const [searchParams,setSearchParams]=useSearchParams()
    const sessionId = searchParams.get("session_id");
   /*  console.log(sessionId) */
   useEffect(()=>{
if (sessionId) {
    axiosSecure.post("/payment-success",{sessionId});
}
   },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Emoji Success */}
        <div className="text-5xl mb-4">✅</div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Payment Successful
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully. Thank you for choosing
          our service.
        </p>

        {/* Status Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
          <p>
            Transaction Status:{" "}
            <span className="font-semibold text-green-600">Completed</span>
          </p>
          <p>We have received your payment successfully.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard/myloan">
            <button className="btn btn-success">Go to Dashboard</button>
          </Link>

          <Link to="/">
            <button className="btn btn-outline">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessFull;
