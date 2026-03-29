import React, { useState, useEffect } from "react";
import cartIcon from "../assets/cart.svg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

const Card = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/user/me');
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleAddToCart = async () => {
    let selectedItem = {
      itemCode: props.itemCode,
      title: props.title,
      price: props.price,
      category: props.category,
      image: props.image,
      quantity: 1,
    };
    try {
      await axios.post("http://localhost:3000/cart", selectedItem);
      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Error adding item to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="w-full md:w-72 max-w-[320px] bg-[#0F2F24] rounded-2xl p-5 my-4 mx-auto md:mx-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-[#D4AF37]/20 flex flex-col justify-between">
        <div className="rounded-xl h-44 flex items-center justify-center overflow-hidden">
          <img
            src={props.image}
            alt={props.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mt-4 flex flex-col grow">
          <h2 className="text-lg font-semibold text-[#D4AF37] text-center">
            {props.title}
          </h2>

          <div className="text-white text-base font-medium mt-2 text-center">
            {props.price} PKR
          </div>

          <button
            onClick={() => {
              !isLoggedIn ? alert("Login first to Order") : handleAddToCart();
            }}
            className="flex items-center justify-center gap-2 w-full mt-4 
      bg-[#D4AF37] text-black py-2 rounded-lg font-medium 
      hover:opacity-90 transition cursor-pointer"
          >
            <img className="w-6" src={cartIcon} alt="Cart Icon" />
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
