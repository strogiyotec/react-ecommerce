import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not an email",
                isAsync: false
            },
            required: true,
            unique: true
        },
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false, required: true},
    }
);
userSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const User = mongoose.model('User', userSchema);
export default User;
