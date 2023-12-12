import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const ManageSingleFood = () => {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const {
    requesterImage,
    requesterEmail,
    requesterName,
    foodStatus,
    requestDate,
  } = data;
  console.log("data", data);

  const handleStatus = () => {
    setdata({
      ...data,
      foodStatus: "Delivered",
    });

    fetch(`https://share-eats-server-three.vercel.app/request/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodStatus: "Delivered",
      }),
    });
  };

  useEffect(() => {
    fetch(`https://share-eats-server-three.vercel.app/request/${id}`)
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container mx-auto flex items-center justify-center flex-col space-y-5">
      <Helmet>
        <title>PHero | ManageSingleFood</title>
      </Helmet>
      <h1>ManageSingleFood</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={requesterImage} alt="Requester Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Status
            <div className="badge badge-secondary">{foodStatus}</div>
          </h2>
          <p>{requesterName}</p>
          <p>{requesterEmail}</p>
          <p>{requestDate}</p>
          <div className="card-actions justify-end">
            {foodStatus !== "Delivered" && (
              <button onClick={handleStatus} className="btn btn-sm btn-outline">
                Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSingleFood;
