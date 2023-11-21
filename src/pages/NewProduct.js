import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImgToBase64 } from "../utility/ImgToBase64";
import toast from "react-hot-toast";

const NewProduct = () => {
  const [data, setData] = useState({
    image: "",
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImgToBase64(e.target.files[0]);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, price, category } = data;

    if (name && image && price && category) {
      // const fetchData = await fetch("http://localhost:5500/uploadProduct", {
        const fetchData = await fetch("https://mernrestaurantbackend.onrender.com/uploadProduct", {

      method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const fetchResponse = await fetchData.json();
      console.log(fetchResponse);
      toast(fetchResponse.message)

      setData(()=>{
        return{
          image: "",
          name: "",
          category: "",
          price: "",
          description: "",
        }
      })
    }else{
      toast("Enter required fields")
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          className="bg-slate-200 p-1 my-1"
          id="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>Vegetables</option>
          <option value={"iceCream"}>IceCream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"noodles"}>Noodles</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center">
            {data.image ? (
              <img src={data.image} className="h-full" alt=""/>
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type="file"
              accept="image"
              id="image"
              onChange={uploadImage}
              className="hidden"
              
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          name="price"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description" className="my-1">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleOnChange}
          value={data.description}
        ></textarea>

        <button className="bg-red-600 text-white text-lg font-medium my-2 drop-shadow rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
