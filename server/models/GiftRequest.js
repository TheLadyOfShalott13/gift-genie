import mongoose from "mongoose";

const GiftRequestSchema = new mongoose.Schema({
    gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift'
    },
    giftee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    tracking_link:      { type: String,         required: true },
    price:              { type: String,         required: true },
    status:             { type: String,         default: "purchased" },
    date_of_purchase:   { type: Date,           required: true },
    date_of_delivery:   { type: Date,           required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

export default mongoose.model("GiftRequest", GiftRequestSchema);