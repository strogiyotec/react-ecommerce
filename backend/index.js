import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routers/usersRouter.js';
import errorHandler from './routers/errors.js';
import cors from 'cors';
var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'shoppingList';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(cors());
app.set("etag", false);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/users', userRouter)
app.use(errorHandler)


app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
});
