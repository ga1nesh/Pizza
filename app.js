const express = require('express');//const mongoose = require('mongoose');
const cors = require('cors');
const auth = require("./middleware/jwt");


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));
app.use('/images2', express.static(__dirname + '/images2'));
app.use(auth());


const pizzasRoutes = require('./routes/pizzas');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const storesRoutes =require('./routes/stores')
app.use('/api/pizzas', pizzasRoutes);
app.use('/api/users', usersRoutes);

app.use('/api/orders', ordersRoutes);
app.use('/api/stores', storesRoutes);

const mongoose = require('mongoose')

const DATABASE_URL = "mongodb://localhost:27017/shopforhome"
const url = 'mongodb://127.0.0.1:27017/mm'

mongoose.Promise=global.Promise
mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true})
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})


app.listen(port , () => {
    console.log(`Server is Running at http://localhost:${port}/api/`)
})
