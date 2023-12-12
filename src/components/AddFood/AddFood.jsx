/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expiredDateTime: "",
    additionalNotes: "",
    donatorImage: user.photoURL,
    donatorName: user.displayName,
    donatorEmail: user.email,
    foodStatus: "available", // Set an initial value
  });

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://share-eats-server-three.vercel.app/addfood",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.insertedId) {
          toast.success("Food Added Successfully");
          setFoodData({
            foodName: "",
            foodImage: "",
            foodQuantity: "",
            pickupLocation: "",
            expiredDateTime: "",
            additionalNotes: "",
            donatorImage: user.photoURL,
            donatorName: user.displayName,
            donatorEmail: user.email,
            foodStatus: "available",
          });
        } else {
          // Handle the case when the server responded with an error
          toast.error("Failed to add food");
        }
      } else {
        // Handle non-200 HTTP response status
        toast.error("Failed to add food");
      }
    } catch (error) {
      // Handle any network or other errors that may occur
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  return (
    <div className="p-4 container mx-auto">
      <Helmet>
        <title>PHero | Add Food</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 bg-orange-200 text-black py-2 text-center">
        Add Food
      </h1>
      <form onSubmit={handleAddFood}>
        {/* FoodName and FoodImage */}
        <div className="flex gap-5">
          <div className="mb-4 flex-1">
            <label htmlFor="foodName" className="block font-semibold">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={foodData.foodName}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="foodImage" className="block font-semibold">
              Food Image
            </label>
            <input
              type="text"
              id="foodImage"
              name="foodImage"
              value={foodData.foodImage}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Food Quantity and Pickup Location */}
        <div className="flex gap-5">
          <div className="mb-4 flex-1">
            <label htmlFor="foodQuantity" className="block font-semibold">
              Food Quantity
            </label>
            <input
              type="text"
              id="foodQuantity"
              name="foodQuantity"
              value={foodData.foodQuantity}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="pickupLocation" className="block font-semibold">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={foodData.pickupLocation}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Expired Date/Time and Additional Notes */}
        <div className="flex gap-5">
          <div className="mb-4 flex-1">
            <label htmlFor="expiredDateTime" className="block font-semibold">
              Expired Date/Time
            </label>
            <input
              type="datetime-local"
              id="expiredDateTime"
              name="expiredDateTime"
              value={foodData.expiredDateTime}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="additionalNotes" className="block font-semibold">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={foodData.additionalNotes}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Donator Information */}
        <div className="flex gap-5">
          <div className="mb-4 flex-1">
            <label htmlFor="donatorImage" className="block font-semibold">
              Donator Image
            </label>
            <input
              disabled
              type="text"
              id="donatorImage"
              name="donatorImage"
              value={user.photoURL}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="donatorName" className="block font-semibold">
              Name
            </label>
            <input
              disabled
              type="text"
              id="donatorName"
              name="donatorName"
              value={user.displayName}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="donatorEmail" className="block font-semibold">
              Email
            </label>
            <input
              disabled
              type="text"
              id="donatorEmail"
              name="donatorEmail"
              value={user.email}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="foodStatus" className="block font-semibold">
              Select an Option
            </label>
            <select
              disabled
              id="foodStatus"
              name="foodStatus"
              value={foodData.foodStatus}
              className="w-full p-2 border rounded"
              required
              onChange={handleInputChange}
            >
              <option value="available">Available</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
