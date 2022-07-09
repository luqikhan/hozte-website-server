import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Create Schema
const OrderSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    businessNature: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },
    addtionalInformation: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Not Paid",
    },
    offer: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Order = model("orders", OrderSchema);
export default Order;
