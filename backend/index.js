import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routers/usersRouter.js';
import productRouter from './routers/productRouter.js';
import errorHandler from './routers/errors.js';
import cors from 'cors';
import User from './models/userModel.js';
import bcrypt from 'bcryptjs';
var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'shoppingList';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);
//create admin
const user = await User.exists({email: 'admin@gmail.com'})
if (!user) {
    console.log("Create user")
    const user = new User({
        name: "admin",
        isAdmin: true,
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 8),
    });
    await user.save();
}
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.set("etag", false);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use(errorHandler)


app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
});
