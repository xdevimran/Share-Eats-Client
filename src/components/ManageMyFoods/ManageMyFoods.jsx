import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const ManageMyFoods = () => {
  const [foodData, setFoodData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    // Fetch user-specific food data from your API or database here
    fetch(
      `https://share-eats-server-three.vercel.app/requests?donatorEmail=${email}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFoodData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [email]);

  const handleEdit = (foodId) => {
    fetch(`https://share-eats-server-three.vercel.app/request/${foodId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("EDIT Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("foodId:", foodId);
  };

  const handleDelete = (foodId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(
              `https://share-eats-server-three.vercel.app/request/${foodId}`,
              {
                method: "DELETE",
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                console.log("DELETE Response:", response);
                toast.success("Food deleted successfully");
                setFoodData(foodData.filter((food) => food._id !== foodId));
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleManage = (foodId) => {
    console.log(`Manage food with ID: ${foodId}`);
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>PHero | Manage My Foods</title>
      </Helmet>
      <table className="min-w-full border rounded-lg">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-2">
              Food Name
            </th>
            <th className="bg-gray-100 border text-left px-8 py-2">Quantity</th>
            <th className="bg-gray-100 border text-left px-8 py-2">
              Food Status
            </th>
            <th className="bg-gray-100 border px-8 py-2">Edit</th>
            <th className="bg-gray-100 border px-8 py-2">Delete</th>
            <th className="bg-gray-100 border px-8 py-2">Manage</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food) => (
            <tr key={food._id}>
              <td className="border px-8 py-2">{food.foodName}</td>
              <td className="border px-8 py-2">{food.foodQuantity}</td>
              <td className="border text-center px-8 py-2 bg-slate-200">
                {food.foodStatus}
              </td>
              <td className="border px-8 py-2">
                <Link to={`/editrequest/${food._id}`}>
                  <button
                    onClick={() => handleEdit(food._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td className="border px-8 py-2">
                <button
                  onClick={() => handleDelete(food._id)}
                  className=" btn btn-sm btn-secondary"
                >
                  Delete
                </button>
              </td>
              <td className="border px-8 py-2">
                <Link to={`/managefoods/${food._id}`}>
                  <button
                    onClick={() => handleManage(food._id)}
                    className="btn btn-sm btn-accent"
                  >
                    Manage
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMyFoods;
