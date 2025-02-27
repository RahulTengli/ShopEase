import React, { useEffect } from "react";
import { userAuth } from "../../context/userContext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
  const { user, token, cart, setCart, fetchCart } = userAuth();

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        `${BASE_URL}/cart/remove`,
        { userId: user._id, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing product", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="justify-center items-center mx-auto p-10 font-bold text-2xl">Your Cart</h2>
      {cart.length === 0 ? <p className="mx-auto p-10 font-semibold text-xl">Cart is empty</p> : (
        cart.map((item) => (
          <div key={item.productId} className="flex justify-between items-center p-4 border-b">
            <img src={item.image} alt={item.title} className="w-16 h-16" />
            <p>{item.title}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button className="bg-red-500 px-3 py-1 rounded" onClick={() => removeFromCart(item.productId)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
