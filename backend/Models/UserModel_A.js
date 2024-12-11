const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  complain_id: {
    type: String,
    require: true,
  },

  customer_name: {
    type: String,
    require: true,
  },

  customer_email: {
    type: String,
    require: true,
  },

  customer_mobile: {
    type: Number,
    require: true,
  },

  customer_address: {
    type: String,
    require: true,
  },

  issue_type: {
    type: String,
    require: true,
  },

  issue_date: {
    type: Date,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  employee_name: {
    type: String,
    require: true,
  },

  employee_email: {
    type: String,
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("UserModel_A", userSchema);
