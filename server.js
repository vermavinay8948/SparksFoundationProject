/*jshint esversion: 8 */

const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const ejs = require("ejs");
let alert = require('alert');
dotenv.config();
const app = express();

const rzp = new Razorpay({
    key_id:"rzp_test_ovvg5DZ8SkboT",
    key_secret:"2yMQLwSZN9qZJrcElMPTjy7B",
});

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/donate", (req, res) => {
    res.render("donate");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/donate", async (req, res) => {

    const amount = req.body.amount;

    const paymentOptions = {
        amount: amount * 100,
        currency: 'INR',
        receipt: '#1',
     };

     const razorpayOrder = rzp.orders.create(paymentOptions);

     return res.json({
        message: 'success',
        order: razorpayOrder
    });

});
app.post("/",function(req,res){

res.redirect("/");
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("server has started");
});
