const Cart = require("../models/cartModel");
// import { cartModel as Cart } from "../models/cartModel";
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addCartProduct = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const { cartItems } = req.body;
  if (!cart) {
    const newcart = await Cart.create({
      cartItems,
      user: req.user._id,
    })

    return res.status(201).json({
      success: true,
      cart: newcart,
    });
  }

  if (cart) {
    const cartitem = await cart.cartItems.find((item) => item.product.toString() === req.body.cartItems[0].product);
    if (cartitem) {
      if (cartitem.quantity + req.body.cartItems[0].quantity <= req.body.cartItems[0].stock) {
        cartitem.quantity = cartitem.quantity + req.body.cartItems[0].quantity;
        await cart.save();

        return res.status(200).json({
          success: true,
          cart,
        });
      }
      return next(new ErrorHander("Quantity has extented the stock limit", 404));
    }
  }
  // const updatedcart = await Cart.findByIdAndUpdate({
  cart.cartItems.push(...cartItems);
  await cart.save();
  res.status(201).json({
    success: true,
    cart,
  });


});

exports.updateCartProduct = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart)
    return next(new ErrorHandler(" No items in the Cart", 404));
  //  req.params.id
  // console.log(req.body, "cart item update")
  const cartitem = await cart.cartItems.find((item) => item.product.toString() === req.body.product);
  if (!cartitem)
    return next(new ErrorHander("Item not found in Cart", 404));
  cartitem.quantity = req.body.quantity;
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });

});
exports.deleteCartProduct = catchAsyncErrors(async (req, res, next) => {

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart)
    return next(new ErrorHandler(" No items in the Cart", 404));


  console.log(req.params, "params")
  const productIndex = await cart.cartItems.findIndex((item) => item.product.toString() === req.params.id);

  if (productIndex === -1) {
    return next(new ErrorHander("Item not found in Cart", 404));
  }
  cart.cartItems.splice(productIndex, 1);
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

exports.myCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems");
  res.status(200).json({
    success: true,
    cart,
  });

});

exports.emptyCart = catchAsyncErrors(async (req, res, next) => {


  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHandler("No items in the Cart", 404));
  }

  cart.cartItems = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart has been emptied successfully",
  });
});









