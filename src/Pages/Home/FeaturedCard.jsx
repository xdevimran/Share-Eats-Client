import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const FeaturedCard = ({ item }) => {
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    // additionalNotes,
    donatorImage,
    donatorName,
    // donatorEmail,
    // foodStatus,
  } = item;
  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden">
      <img
        className="w-full h-40 object-cover"
        src={foodImage}
        alt="Food Image"
      />
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{foodName}</div>
        <div className="flex items-center mb-2">
          <img
            className="w-10 h-10 rounded-full"
            src={donatorImage}
            alt="Donator Image"
          />
          <span className="ml-2">{donatorName}</span>
        </div>
        <p className="text-gray-700 text-sm mb-2">Quantity: {foodQuantity}</p>
        <p className="text-gray-700 text-sm mb-2">
          Pickup Location: {pickupLocation}
        </p>
        <p className="text-gray-700 text-sm mb-2">Expires: {expiredDateTime}</p>
        <p className="text-gray-700 text-sm">
          Additional Notes: No bacon, extra cheese
        </p>
        <Link to={`/fooddetails/${_id}`}>
          <button className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 rounded mt-4">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
