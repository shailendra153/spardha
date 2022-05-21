const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const adminRouter = require('./router/admin.router');
const playerRouter = require("./router/player.router");
const teamRouter = require('./router/team.router');
const organiserRouter = require('./router/organiser.router');
const tournamentRouter = require('./router/tournament.router');
const paymentRouter=require('./router/payment.router');
const contactRouter=require('./router/contact.router');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://root:root@cluster0.gffjq.mongodb.net/FINALSPARDHA?retryWrites=true&w=majority")
    .then(() => {
        app.use('/admin', adminRouter);
        app.use('/team', teamRouter);
        app.use('/payment',paymentRouter);
        app.use('/organiser', organiserRouter);
        app.use('/tournament', tournamentRouter);
        app.use('/contact',contactRouter);
        app.use(playerRouter);
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server Is Running")
            console.log("successfully connected to database....")
        })
    }).catch(err => {
        console.log(err);
    })

//.........................SHELU DATABASE COnnectivity.........mongodb+srv://root:root@cluster0.gffjq.mongodb.net/pratisparda?retryWrites=true&w=majority