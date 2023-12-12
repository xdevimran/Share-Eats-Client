import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>PHero | 404 Not Found</title>
      </Helmet>
      <img
        className="w-40 h-40 mb-4"
        src="https://cdn-icons-png.flaticon.com/512/1140/1140337.png"
        alt=""
      />
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        404 Not Found
      </h1>
      <p className="text-gray-600 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 mt-4 hover:underline">
        <button className="btn bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded">
          Go back to the Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound404;
