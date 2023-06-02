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

  const apiFeature = new ApiFeatures(Order.find({ user: req.user._id }).sort({createdAt: -1}), req.query)
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
  const resultsPerPage = 2;
  const ordersCount = await Order.find({ "orderItems.seller": req.user._id } ).countDocuments();

  const apiFeature = new ApiFeatures(Order.find({ "orderItems.seller": req.user._id } ), req.query)
    .pagination(resultsPerPage);

  let orders = await apiFeature.query;
  orders.forEach((order) => { order.orderItems = order.orderItems.filter((item) => item.seller.toString()  == req.user._id); });
  let = orders.length;

  res.status(200).json({
    success: true,
    orders,
    ordersCount,
    resultsPerPage
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

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