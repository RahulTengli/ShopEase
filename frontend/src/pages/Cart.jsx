import React, { useEffect } from "react";
import { userAuth } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
  const { user, token, cart, fetchCart } = userAuth();

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
      toast.success("Removed from Cart!");
      fetchCart();
    } catch (error) {
      console.error("Error removing product", error);
      toast.error("Failed to remove product!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 py-10 px-4 sm:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4 last:border-none"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-md"
              />

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left sm:ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">Price: <span className="text-blue-600 font-bold">${item.price}</span></p>
                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => removeFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Calculation */}
          <div className="mt-6 text-xl font-bold text-gray-800">
            Total: $
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
