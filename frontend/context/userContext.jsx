import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('token')) || null);
    const [token,setToken] = useState(null);
    console.log("token from atuh",token);

    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const storeToken = JSON.parse(localStorage.getItem('token'));
        setToken(storeToken);
        setUser(JSON.parse(localStorage.getItem('user')));
        
    },[])

    useEffect(() => {
        if (user) fetchCart();
      }, [user]);
    
      const fetchCart = async () => {
        if (!user || !user._id) return;  // Prevent request if user is not available
        
        try {
          const response = await axios.get(`${BASE_URL}/cart/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(response.data.products);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
        
    const logout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }

    return( <UserContext.Provider value={{user,setUser,token, setToken,logout,cart,setCart,fetchCart}}>
        {children}
    </UserContext.Provider>)
}

export const userAuth=() => useContext(UserContext);

