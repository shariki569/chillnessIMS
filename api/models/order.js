import mongoose, { Mongoose } from "mongoose";

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     products: [
//         {
//             name: {
//                 type: String,
//                 required: true,

//             },
//             quantity: {
//                 type: Number,
//                 required: true,
//             },
//             price: {
//                 type: Number,
//                 required: true
//             },
//             image: {
//                 type: String,
//                 required: true,
//             }
//         }
//     ],
//     totalPrice: {
//         type: Number,
//         required: true,
//     },
//     shippingAddress: {
//         name: {
//             type: String,
//             required: true,
//         },
//         mobileNo: {
//             type: String,
//             required: true
//         },
//         houseNo: {
//             type: String,
//             require: true,
//         },
//         landmark: {
//             type: String,
//             require: false,
//         },
//         postalCode: {
//             type: String,
//             require: true,
//         }
//     },
//     paymentMethod: {
//         type: String,
//         require: true,
//     },
//     createdAt:{
//         type: Date,
//         default: Date.now(),
//     }
// })

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    quantity: {
      type: Number,
      required: true,
    },
  },
});

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [orderItemSchema],
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    }
})

const Order = mongoose.model("Order", orderSchema);

export default Order;
