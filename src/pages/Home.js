import React from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useRef } from "react";
import AllProduct from "../component/AllProduct";


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);

  const homeProductCardList = productData.slice(0,5);
  const homeProductCardListVegetables = productData.filter(
    (el) => el.category === "vegetables",
    []
  );
  // console.log(homeProductCardListVegetables);

  const loadingArray = new Array(5).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 py-4">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4465/4465086.png"
              className="h-7" alt=""
            ></img>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery at
            <span className="text-red-600 text"> Your Doorstep</span>{" "}
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            aspernatur veritatis provident eligendi dolore expedita rem minima,
            ratione a, blanditiis facere nobis itaque velit nesciunt. Suscipit
            voluptatum facilis amet id reprehenderit officia.
          </p>
          <button className="font-bold bg-red-200  px4 py-0 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center ">
          {homeProductCardList[0]
            ? homeProductCardList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading...."} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb2">
            Fresh Vegetables
          </h2>
          <div className="ml-auto">
            <button
              onClick={preveProduct}
              className="bg-slate-200 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-200 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCardListVegetables[0]
            ? homeProductCardListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"vegetable"}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading" key={index+"cardLoading"} />
              ))}
        </div>
      </div>

      <AllProduct  heading={"Your Product"}/>
    </div>
  );
};

export default Home;
