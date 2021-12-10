
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
    }
)

orderSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});
const Order = mongoose.model('Order', orderSchema);

export default Order;
