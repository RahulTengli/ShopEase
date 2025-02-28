import React from "react";

const PopupCard = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={(e) =>{
            e.stopPropagation();
            onClose()}
        }
        >
          ✖
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />

        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-gray-700 text-sm my-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-lg">${product.price}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-yellow-600">rating : ⭐ {product.rating.rate}/5 ({product.rating.count} reviews)</p>

        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-700"
          onClick={(e) =>{
              e.stopPropagation();
              addToCart(product)}
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopupCard;
