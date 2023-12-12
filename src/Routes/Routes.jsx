import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import NotFound404 from "../components/NotFound404/NotFound404";
import AvailableFoods from "../components/AvailableFoods/AvailableFoods";
import AddFood from "../components/AddFood/AddFood";
import ManageMyFoods from "../components/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../components/MyFoodRequest/MyFoodRequest";
import PrivetRoute from "./PrivetRoute";
import FoodDetails from "../components/AvailableFoods/FoodDetails";
import ManageSingleFood from "../components/ManageMyFoods/ManageSingleFood";
import EditSingleFoodRequest from "../components/ManageMyFoods/EditSingleFoodRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availablefoods",
        element: <AvailableFoods />,
      },
      {
        path: "/addfood",
        element: (
          <PrivetRoute>
            <AddFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/managefoods",
        element: (
          <PrivetRoute>
            <ManageMyFoods />
          </PrivetRoute>
        ),
      },
      {
        path: "/foodrequest",
        element: (
          <PrivetRoute>
            <MyFoodRequest />
          </PrivetRoute>
        ),
      },
      {
        path: "/availablefoods/",
        element: <AvailableFoods />,
      },

      {
        path: "/fooddetails/:id",
        element: (
          <PrivetRoute>
            <FoodDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/managefoods/:id",
        element: (
          <PrivetRoute>
            <ManageSingleFood />
          </PrivetRoute>
        ),
      },
      {
        path: "/editrequest/:id",
        element: (
          <PrivetRoute>
            <EditSingleFoodRequest />
          </PrivetRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
