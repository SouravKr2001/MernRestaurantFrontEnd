import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProducts } from "./redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state)=>state.product)
  

  useEffect(() => {
    (async () => {
      // const res = await fetch("http://localhost:5500/products");
      
      const res = await fetch("https://mernrestaurantbackend.onrender.com/products");
      
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProducts(resData))
    })();
  }, []);

  // console.log(productData)
  // console.log(process.env.REACT_APP_WEBSITE_NAME)

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
