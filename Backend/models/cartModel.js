const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    cartItems: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          seller: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
        Stock: {
          type: Number,
          required: true,
          // default: 1,
        },
        },],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);