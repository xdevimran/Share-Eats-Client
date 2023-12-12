import { useContext, useEffect, useState } from "react";
import AvailableFoodsCard from "./AvailableFoodsCard";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";

const AvailableFoods = () => {
  const [foodData, setFoodData] = useState([]);
  const [search, setSearch] = useState("");
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://share-eats-server-three.vercel.app/allfood")
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
        loading(false);
      })
      .catch((err) => {
        console.log(err);
        loading(false);
        console.log("user", user);
      });
  }, [loading, user]);

  return (
    <div>
      <Helmet>
        <title>PHero | Available Foods</title>
      </Helmet>
      <div className="bg-orange-200 py-5 ">
        <div className="flex gap-5 container mx-auto">
          <div>
            <button
              onClick={() => {
                console.log("clicked");
              }}
              className="btn btn-outline"
            >
              Sort By Date
            </button>
          </div>
          <div className="form-control flex-1">
            <div className="input-group">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
          {foodData
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.foodName.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((food) => (
              <AvailableFoodsCard key={food._id} food={food} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableFoods;
