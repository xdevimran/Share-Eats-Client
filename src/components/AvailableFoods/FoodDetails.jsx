/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const FoodDetails = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});
  const { user } = useContext(AuthContext);

  // const requesterEmail
  // const

  const {
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    requestDate,
    additionalNotes,
    donatorImage,
    donationMoney,
    donatorName,
    donatorEmail,
    foodStatus = "Pending",
    requesterEmail = user?.email,
    requesterName = user?.displayName,
    requesterImage = user?.photoURL,
  } = foodData;

  const requesterData = {
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    requestDate: new Date().toLocaleString(),
    additionalNotes,
    donatorImage,
    donationMoney,
    donatorName,
    donatorEmail,
    foodStatus: "Pending",
    requesterEmail: user?.email,
    requesterName: user?.displayName,
    requesterImage: user?.photoURL,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://share-eats-server-three.vercel.app/food/${id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID ${id}`);
        }
        const data = await response.json();
        setFoodData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // console.log(foodData?.donator.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const modal = document.getElementById("my_modal_4");

  // hande request for open POPup
  const handleRequestClick = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
  };

  // handle request for sending requestconst handleRequest = (e) => {
  const handleRequest = (e) => {
    e.preventDefault();
    console.log(requesterData);
    fetch("https://share-eats-server-three.vercel.app/addrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requesterData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Food request sent successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Close after 3 seconds
          });
          modal.close();
        } else {
          alert("Failed to send request");
        }
      });

    // Perform any further actions or API requests here
  };

  // Perform any further actions or API requests here
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>PHero | Food Details</title>
      </Helmet>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img className="w-[200px] h-[200px]" src={foodImage} alt="Food" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {!isLoading ? donatorName : "No data found"}
          </h2>
          <p>location: {pickupLocation}</p>
          <hr />
          <p>{foodName}</p>
          <p>quantity: {foodQuantity}</p>
          <p>exp: {expiredDateTime}</p>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded mt-4"
              onClick={handleRequestClick}
            >
              Request
            </button>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div>
              <form onSubmit={handleRequest}>
                {/* FoodName and FoodImage */}
                <div className="flex gap-5">
                  <div className="mb-4 flex-1">
                    <label htmlFor="foodName" className="block font-semibold">
                      Food Name
                    </label>
                    <input
                      type="text"
                      disabled={true}
                      id="foodName"
                      name="foodName"
                      value={foodName}
                      className="w-full p-2 border rounded disabled"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label htmlFor="foodImage" className="block font-semibold">
                      Food Image
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      id="foodImage"
                      name="foodImage"
                      value={foodImage}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Food Quantity and Pickup Location */}
                <div className="flex gap-5">
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="foodQuantity"
                      className="block font-semibold"
                    >
                      Food Quantity
                    </label>
                    <input
                      disabled={true}
                      type="number"
                      id="foodQuantity"
                      name="foodQuantity"
                      value={foodQuantity}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="pickupLocation"
                      className="block font-semibold"
                    >
                      Pickup Location
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      value={pickupLocation}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Expired Date/Time and Additional Notes */}
                <div className="flex gap-5">
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="expiredDateTime"
                      className="block font-semibold"
                    >
                      Expired Date/Time
                    </label>
                    <input
                      disabled={true}
                      type="datetime-local"
                      id="expiredDateTime"
                      name="expiredDateTime"
                      value={expiredDateTime}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="additionalNotes"
                      className="block font-semibold"
                    >
                      Additional Notes (editable)
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={additionalNotes}
                      className="w-full p-2 border rounded text-green-500"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="requestDate"
                      className="block font-semibold"
                    >
                      Request Date (current time)
                    </label>
                    <input
                      type="text"
                      id="requestDate"
                      name="requestDate"
                      value={new Date().toLocaleString()} // Set the value to the current time
                      className="w-full p-2 border rounded"
                      disabled // To make it read-only
                    />
                  </div>

                  <div className="mb-4 flex-1">
                    {/* Food Id */}
                    <label htmlFor="FoodID" className="block font-semibold">
                      Donation Money (editable)
                    </label>
                    <input
                      type="text"
                      id="donationMoney"
                      name="donationMoney"
                      value={donationMoney}
                      className="w-full p-2 border rounded text-green-500"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Donator Information */}
                <div className="flex gap-5">
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="requesterName"
                      className="block font-semibold"
                    >
                      Name
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      id="requesterName"
                      name="requesterName"
                      value={requesterName}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="requesterEmail"
                      className="block font-semibold"
                    >
                      Email
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      id="requesterEmail"
                      name="requesterEmail"
                      value={requesterEmail}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label htmlFor="foodStatus" className="block font-semibold">
                      Status
                    </label>
                    <select
                      disabled={true}
                      id="foodStatus"
                      name="foodStatus"
                      value={foodStatus}
                      className="w-full p-2 border rounded"
                      required
                      onChange={handleInputChange}
                    >
                      <option value="Pending">Pending</option>
                      {/* <option value="unavailable">Delivered</option> */}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded w-full"
                >
                  Request
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* Close the modal when the "Close" button is clicked */}
                <button className="btn" onClick={() => modal.close()}>
                  Close
                </button>
                {/* You can add more content and actions for your modal here */}
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default FoodDetails;
