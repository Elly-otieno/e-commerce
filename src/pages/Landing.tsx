import Banner from "../components/layout/Banner";
import Featured from "../components/layout/Featured";
import Testimonials from "../components/layout/Testimonial";

const Landing = () => {
  return (
    <div className="">
      <Banner />
      <Featured />
      <div>
        <h1 className="text-slate-800 font-bold text-3xl ">
          What Our Customers Say
        </h1>
        <Testimonials />
      </div>
    </div>
  );
};

export default Landing;
