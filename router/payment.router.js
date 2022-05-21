const express =require('express');
const router=express.Router()
const Razorpay = require("razorpay")
var instance = new Razorpay({ key_id: "rzp_test_k45BWvh7O4E1Os", key_secret: 'slUd8Wf94kHnzcutqC7TVNSA' })

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






