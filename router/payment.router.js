const express =require('express');
const router=express.Router()
const Razorpay = require("razorpay")
var instance = new Razorpay({ key_id: 'rzp_test_mfvwXKR6q5R7lz', key_secret: '47dIbD02PPDzGUFbBum18Qz4' })

router.post('/get-payment', (req, res) => {
    console.log(req.body)
    instance.orders.create({
        amount: req.body.amount,
        currency: "INR",
        receipt: "receipt#1"
    }, (err, order) => {
        console.log(order)
        res.json(order)
    })
})




module.exports = router;
