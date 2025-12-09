import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Emoji */}
        <div className="text-5xl mb-4">❌</div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Payment Cancelled
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can retry the payment or return to
          the dashboard.
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
          <p>
            Transaction Status:
            <span className="font-semibold text-red-600"> Cancelled</span>
          </p>
          <p>No amount has been deducted from your account.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard">
            <button className="btn btn-outline">Go to Dashboard</button>
          </Link>

          <Link to="/all-loan">
            <button className="btn btn-error">Try Again</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
