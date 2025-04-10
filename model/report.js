const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/village";

async function main() {
     await mongoose.connect(URL);
}
main()
     .then(() => console.log("connected"))
     .catch((err) => console.log(err));

const reportSchema = (
     {

          report:
          {
               type: String,
               minlength: 10,
               trim: true
          },
          category:
          {
               type: String,
               required: true
          },
          reportedBy: {
               type: String,  // store user's name here
               required: true
          },
          date:
          {
               type: String
          },

          areaName: {
               type: String,
               required: true
          },
          houseNumber: {
               type: String,
               required: true
          }
     }
);

const userReport = mongoose.model("report", reportSchema);
module.exports = userReport;