import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            name: {
                type: String,
                required: true,

            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        name: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: String,
            required: true
        },
        houseNo: {
            type: String,
            require: true,
        },
        landmark: {
            type: String,
            require: false,
        },
        postalCode: {
            type: String,
            require: true,
        }
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
})

const Order = mongoose.model('Order', orderSchema);

export default Order