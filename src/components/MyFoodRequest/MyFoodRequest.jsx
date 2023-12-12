import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyFoodRequest = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://share-eats-server-three.vercel.app/requests/?requesterEmail=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>PHero | MyFoodRequest</title>
      </Helmet>
      <h1 className="text-3xl text-center py-2 bg-orange-200 text-black font-bold">
        My Food Request
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => (
          <div data-aos="fade-left" key={item._id}>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  Donor Name: {item.donatorName}
                </div>
                <div className="text-gray-600">
                  Status:{" "}
                  <span className="badge badge-secondary">
                    {item.foodStatus}
                  </span>
                </div>
              </div>
              <div className="text-gray-600 mt-2">
                Pickup Location: {item.pickupLocation}
              </div>
              <div className="text-gray-600">
                Expire Date: {item.expiredDateTime}
              </div>
              <div className="text-gray-600">
                Request Date: {item.requestDate}
              </div>
              <div className="text-gray-600">
                Your Donation Amount: {item.donationMoney}
              </div>
              <div className="mt-4">
                {item.foodStatus === "Pending" ? (
                  <button
                    onClick={() => {
                      fetch(
                        `https://share-eats-server-three.vercel.app/request/${item._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            foodStatus: "Canceled",
                          }),
                        }
                      ).then(() => {
                        window.location.reload();
                      });
                    }}
                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                  >
                    Cancel Request
                  </button>
                ) : item.foodStatus == "Delivered" ? null : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoodRequest;
