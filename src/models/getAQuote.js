import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Create Schema
const GetAQuoteSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    country: {
      type: String,
      required: true,
    },
    businessNature: {
      type: String,
      required: true,
    },
    addtionalInformation: {
      type: String,
    },
    services: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const GetAQuote = model("quotes", GetAQuoteSchema);
export default GetAQuote;
