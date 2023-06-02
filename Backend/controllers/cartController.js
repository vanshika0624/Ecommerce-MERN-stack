const Cart = require("../models/cartModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addCartProduct= catchAsyncErrors(async(req,res,next)=>{
    const cart = await Cart.findOne(req.user._id);
    const cartitems = req.body
    if(!cart){
       const newcart = await Cart.create({
        cartitems,
        user: req.user._id,
      })
      res.status(201).json({
        success: true,
        newcart,
      });
    }
    
      else 
      {
        // const updatedcart = await Cart.findByIdAndUpdate({
          cart.push(cartitems)
        }
     
        res.status(201).json({
            success: true,
            cart,
          });
     

});
exports.updateCartProduct= catchAsyncErrors(async(req,res,next)=>{

});
exports.deleteCartProduct= catchAsyncErrors(async(req,res,next)=>{

    const product = await Cart.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHander("Item not found in Cart",404));

        await Cart.findByIdAndDelete(req.params.id);
    }
});
exports.mycart= catchAsyncErrors(async(req,res,next)=>{


});

