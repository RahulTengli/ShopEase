import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModels", required: true },
  products: [
    {
      productId: { type: String, required: true }, // Store product ID as a string
      title: { type: String, required: true }, // Store product title
      price: { type: Number, required: true }, // Store product price
      image: { type: String }, // Store product image URL
      quantity: { type: Number, default: 1 }, // Store quantity
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
