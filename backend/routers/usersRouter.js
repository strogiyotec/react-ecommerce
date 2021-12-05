import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.delete(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOneAndRemove(req.params.id);
        res.send(user)
    })
);
userRouter.put(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.isAdmin = req.body.isAdmin;
            const createdUser = await user.save();
            res.send({
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
            });
        } else {
            res.status(404).send({message: 'User Not Found'});
        }
    })
);
userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({message: 'User Not Found'});
        }
    })
);
userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const start = req.query._start
        const end = req.query._end
        const users = await User.find()
            .sort({'id': -1})
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', users.length)
        res.send(users.slice(start, end));
    })
);

userRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            isAdmin: req.body.isAdmin,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    })
);
export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        'PASSWORD',
        {
            expiresIn: '30d',
        }
    );
};
export default userRouter;
