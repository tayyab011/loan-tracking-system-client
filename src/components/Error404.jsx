import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#155C62] text-[#B5F6EB] p-4">
      <h1 className="text-6xl md:text-9xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        Page Not Found
      </h2>
      <p className="text-center mb-8">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn bg-[#86A9AB] hover:bg-[#29A6A6] text-white font-semibold hover:scale-105 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
