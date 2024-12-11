const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complainSchema = new Schema(
  {
    comp_id : {
      type:String, //Data Type            // Custom Complain ID field
      unique:true //Validate
  },

    cus_name: {
      type: String,
      required: true,
    },

    cus_email: {
      type: String,
      required: true,
    },

    cus_address: {
      type: String,
      required: true,
    },

    cus_mobile_no: {
      type: Number,
      required: true,
    },

    issue_type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date,
    },

    status: {
      type: String,
      default: "Open",
    },
    viewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Custom ID generation function (Example: Prefix + Random 3-digit number)
function generateCustomComplainId() {
  const prefix = "COM";
  // Generate a secure random 3-digit number (from 100 to 999)
  const randomNumber = crypto.getRandomValues(new Uint8Array(1))[0] % 900 + 100;
  return `${prefix}${randomNumber}`;
}


// Pre-save hook to assign a custom ID if it doesn't exist
complainSchema.pre('save', function (next) {
  if (!this.comp_id) {
      this.comp_id = generateCustomComplainId(); // Generate and assign custom ID
  }
  next();
});

module.exports = mongoose.model("ComplainModel", complainSchema);
