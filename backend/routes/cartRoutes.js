import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Authentication middleware

const router = express.Router();

// **1. Get User's Cart**
// router.get("/:userId", verifyToken, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     if (!cart) return res.status(404).json({ message: "Cart is empty" });
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching cart", error });
//   }
// });

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.json({ userId: req.params.userId, products: [] }); // Return empty cart instead of 404
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});


// **2. Add Product to Cart**
router.post("/add", verifyToken, async (req, res) => {
  const { userId, productId, title, price, image } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, title, price, image, quantity: 1 }] });
    } else {
      const existingProduct = cart.products.find((p) => p.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product exists
      } else {
        cart.products.push({ productId, title, price, image, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
});

// **3. Remove Product from Cart**
router.post("/remove", verifyToken, async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((p) => p.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error });
  }
});

export default router;
