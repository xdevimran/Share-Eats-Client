import { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import { Link } from "react-router-dom";

const Featured = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://share-eats-server-three.vercel.app/allfoodquntity")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold py-5">Featured items</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.slice(0, 6).map((item, index) => (
          <div key={index} className="my-4">
            <FeaturedCard item={item} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-5">
        <Link to="/availablefoods">
          <button className="btn bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded mt-4">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
