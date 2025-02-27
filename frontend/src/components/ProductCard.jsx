import { userAuth } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast"

const ProductCard = ({ product }) => {
  const { user, token } = userAuth();

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to the cart!");
      return;
    }
  
    try {
      console.log("product", product);
  
      const payload = {
        userId: user._id,  
        productId: product.id.toString(), // Convert to string to avoid type mismatch
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,  // Default quantity
      };
      
  
      console.log("Payload:", payload);
      console.log("token in product card",token)
      const response = await axios.post(
        "http://localhost:4000/api/cart/add",
        payload,
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      toast.error("Failed to add product to cart");
    }
  };
  
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img src={product.image} alt={product.title} className="h-40 object-contain" />
      <h3 className="text-lg font-semibold mt-2 text-center">{product.title}</h3>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <button
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
