import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardFeature from "../component/CardFeature";

import FilterProduct from "../component/FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  // console.log(categoryList);
  //filter data  display

  const[filterby,setFiterBy]=useState("")
  const [dataFilter, setDataFilter] = useState([]);
  const loadingArrayFeature = new Array(10).fill(null);


  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFiterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  return (
    <div>
      <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb2">{heading}</h2>

        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] ? (
            categoryList.map((el) => {
              return (
                <FilterProduct
                key={el}
                  category={el}
                  isActive={el.toLowerCase() === filterby.toLowerCase()}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })
          ) : (
            <div className="min-h-[150px] flex justify-center items-center">
              <p>loading</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
          {dataFilter[0]
            ? dataFilter.map((el) => {
                return (
                  <CardFeature
                    id={el._id}
                    key={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading" key={index+"allProduct"}/>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
