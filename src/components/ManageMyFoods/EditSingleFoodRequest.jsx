import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const EditSingleFoodRequest = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodData = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodQuantity: form.foodQuantity.value,
      pickupLocation: form.pickupLocation.value,
      expiredDateTime: form.expiredDateTime.value,
      additionalNotes: form.additionalNotes.value,
    };
    console.log(foodData);
    fetch(`https://share-eats-server-three.vercel.app/request/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //show toast
        toast.success("Food request updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Close after 3 seconds
        });
        // window.location.href = "/managefoods";
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`https://share-eats-server-three.vercel.app/request/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Helmet>
        <title>PHero | Edit Food Request</title>
      </Helmet>
      <h1 className="text-center text-3xl">
        Update Food Request: {formData.foodName}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Form fields here */}
        <div className="flex gap-4">
          <div className="mb-4 flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="foodName"
            >
              Food Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="foodName"
              defaultValue={formData.foodName}
              //   onChange={handleChange}
              type="text"
              placeholder="Enter food name"
            />
          </div>
          <div className="mb-4 flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="foodImage"
            >
              Food Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="foodImage"
              name="foodImage"
              defaultValue={formData.foodImage}
              //   onChange={handleChange}
              type="text"
              placeholder="Enter image URL"
            />
          </div>
        </div>
        {/* Food Quantity, Pickup Location, and Expired Date/Time */}
        <div className="flex gap-4">
          <div className="mb-4 flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="foodQuantity"
            >
              Food Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="foodQuantity"
              name="foodQuantity"
              defaultValue={formData.foodQuantity}
              //   onChange={handleChange}
              type="number"
              placeholder="Enter quantity"
            />
          </div>
          <div className="mb-4 flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pickupLocation"
            >
              Pickup Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pickupLocation"
              name="pickupLocation"
              defaultValue={formData.pickupLocation}
              //   onChange={handleChange}
              type="text"
              placeholder="Enter pickup location"
            />
          </div>
          <div className="mb-4 flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiredDateTime"
            >
              Expired Date/Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiredDateTime"
              name="expiredDateTime"
              defaultValue={formData.expiredDateTime}
              //   onChange={handleChange}
              type="datetime-local"
            />
          </div>
        </div>
        {/* Additional Notes */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="additionalNotes"
          >
            Additional Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="additionalNotes"
            name="additionalNotes"
            defaultValue={formData.additionalNotes}
            // onChange={handleChange}
            placeholder="Enter additional notes"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded mt-4 "
            type="submit"
          >
            Update requested food
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSingleFoodRequest;
