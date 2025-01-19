import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
    name:       { type: String },
    website:    { type: String },
    threshold:  { type: String },
    imgName:    { type: String },
    img:        { data: Buffer,     contentType: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model("Gift", GiftSchema);