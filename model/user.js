const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/village";

async function main() {
     await mongoose.connect(URL);
}
main()
     .then(() => console.log("connected"))
     .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     age: {
          type: Number,
          min: [15, "Invalid age"]
     },
     mobile_number: {
          type: String,
          maxlength: [15, "Invalid mobile number"]
     }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
