import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../../context/userContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, cart } = userAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);


  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
      <h2 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>ShopEase</h2>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/cart" className="hover:underline">Cart {cart?.length || 0}</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
