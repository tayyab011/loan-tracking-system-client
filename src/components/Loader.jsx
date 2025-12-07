import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
        aspect-square w-8 flex justify-center items-center text-yellow-700"
      >
        $
      </div>
    </div>
  );
};

export default Loader;
