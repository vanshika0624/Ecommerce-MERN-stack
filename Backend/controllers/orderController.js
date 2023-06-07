const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    servicePrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    servicePrice,
    shippingPrice,
    totalPrice,
    orderDate: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstname lastname email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All User Orders
exports.getAllBuyerOrders = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 2;
  const ordersCount = await Order.find({ user: req.user._id }).countDocuments();

  const apiFeature = new ApiFeatures(Order.find({ user: req.user._id }).sort({ createdAt: -1 }), req.query)
    .pagination(resultsPerPage);

  let orders = await apiFeature.query;

  let = orders.length;

  res.status(200).json({
    success: true,
    orders,
    ordersCount,
    resultsPerPage
  });
});


// get all Orders -- Seller
exports.getAllSellerOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ "orderItems.seller": req.user._id }).populate(
    "user",
    "firstname lastname email"
  );
  orders.forEach((order) => { order.orderItems = order.orderItems.filter((item) => item.seller.toString() == req.user._id); });

  let ordersCount = orders.length
  res.status(200).json({
    success: true,
    orders,
    ordersCount
  });
});

// get single Order -- Seller
exports.getSellerSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstname lastname email"
  );
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  order.orderItems = order.orderItems.filter((item) => item.seller.toString() == req.user._id);

  res.status(200).json({
    success: true,
    order,
  });
});


// update Order Status -- Seller
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  order.orderItems.forEach((prod) => {

    if (prod.product.toString() === req.body.productId.toString()) {

      if (prod.orderStatus.toString() === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400));
      }

      if (prod.orderStatus.toString() !== "Shipped" && req.body.status.toString() === "Shipped") {
        updateStock(prod.product, prod.quantity);
      }

      if (req.body.status.toString() === "Delivered") {
        prod.deliveredAt = Date.now();
      }

      prod.orderStatus = req.body.status;


    }
  });

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= (quantity / 2);

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});