import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    getCartItems();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };


  const increaseQty = (id) => {
    setCartItems(cartItems.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };


  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add some items to place an order.");
      return;
    }

    navigate("/orderform");
  };

  return (
    <>
 
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center gap-6 p-4 bg-[#0F2F24] rounded-xl shadow hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-yellow-600">{item.title}</h2>
                <p className="text-white">Price: {item.price} pkr</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="w-8 h-8  rounded hover:bg-red-500"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="w-8 h-8  rounded hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col items-end justify-between h-full">
                <p className="font-bold text-lg ">{item.price * item.quantity} pkr</p>
                <button
                  onClick={() => deleteCartItem(item._id)}
                  className="text-red-500 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-6 border border-green-500 bg-[#081f15] rounded-3xl shadow-xl">
            <div>
              <p className="text-sm text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart</p>
              <h2 className="text-3xl font-bold mt-2">Total: ₹{total}</h2>
            </div>
            <button
              onClick={proceedToCheckout}
              className="mt-4 md:mt-0 px-6 py-3 bg-linear-to-r from-emerald-500 to-lime-500 text-black font-semibold rounded-2xl shadow-lg hover:scale-[1.01] transition"
            >
              Proceed to Order
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CartPage;