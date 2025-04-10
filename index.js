const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const user = require("./model/user.js");
const userReport = require("./model/report.js");
 
const { report } = require("process");
// const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); // needed to parse JSON


app.set("views engine", "ejs")

app.listen(port, () => {
     console.log(`http://localhost:${port}`);
})
app.get("/", (req, res) => {
     // res.send("server is serving");
     res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

app.get("/user/register", (req, res) => {
     res.render("adduser.ejs");
})

app.get("/user/signin", (req, res) => {
     res.render("signin.ejs");
})
//user sign in logic
app.post("/user/signin", async (req, res) => {
     const { name, password } = req.body;

     try {
          const findUser = await user.findOne({ name: name });
         

          if (!findUser) {
               return res.send("❌ user not found");
          } else if (findUser.password != password) {
               return res.send("❌ password incorrect");
          } else {
               const reportDetails = await userReport.find({ reportedBy: name });
               res.render("home.ejs", { findUser,reportDetails});
               console.log(`✅ Welcome back, ${findUser.name}!`);

          }
     } catch (err) {
          console.log("there was an error", err);
          res.send("❌ Something went wrong.");
     }
});

//user registration data logic
app.post("/user/register", (req, res) => {
     let { name, password, email, age, number } = req.body;
     const user1 = new user(
          {
               name: name,
               password: password,
               email: email,
               age: age,
               mobile_number: number
          }
     )
     console.log(user1);
     user1.save()
          .then((res) => console.log("user saved successfully"))
          .catch((err) => console.log(err))
     res.redirect("/")
});

app.get("/alluser", async (req, res) => {
     let alluser = await user.find();
     res.render("alluser.ejs", { alluser })
})

app.post("/user/problem", async (req, res) => {
     let { category, report, reporter, date , area , house} = req.body;
     let userproblem = new userReport(
          {
               report: report.trim(),
               category: category,
               reportedBy : reporter,
               date : date,
               areaName : area,
               houseNumber : house
          }
     )
     userproblem.save()
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
         
})

 