const mongoose = require("mongoose");
const { v1: uuidv1 } = require('uuid');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    default: function genUUID() {
      return uuidv1()
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      orderStatus: {
        type: String,
        default: "Processing",
      },
      refNumber: {
        type: Number,
        default: 1
      },
      deliveredAt: Date
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "Cash on Delivery",
    },
  },
  orderDate: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  servicePrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  overallOrderStatus: {
    type: String,
    default: "Processing",
  },
  overallDeliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


orderSchema.pre("save", async function (next) {
  const order = this;
  const IsShipped = order.orderItems.every(item => item.orderStatus === 'Shipped'); 
  const IsDelivered = order.orderItems.every(item => item.orderStatus === 'Delivered'); 

  if (IsShipped) {
    order.overallOrderStatus = 'Shipped';
  }
  else if (IsDelivered) {
    order.overallOrderStatus = 'Delivered';
    order.overallDeliveredAt = Date.now();
  }
  else {
      order.overallOrderStatus = 'Processing';
  }
  next();
});


module.exports = mongoose.model("Order", orderSchema);