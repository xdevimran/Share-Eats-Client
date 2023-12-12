import { Helmet } from "react-helmet-async";
import Hero from "../../components/Header/Hero";
import Featured from "./Featured";
import Donator from "./Donator";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PHero | Home Page</title>
      </Helmet>
      <Hero />
      <Featured />
      <Subscribe />
      <Donator />
    </div>
  );
};

export default Home;
