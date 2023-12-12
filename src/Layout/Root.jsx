import { Outlet } from "react-router-dom";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
const Root = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Navigation />
      </div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Root;
