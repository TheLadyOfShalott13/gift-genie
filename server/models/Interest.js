import mongoose from "mongoose";

const InterestSchema = new mongoose.Schema({
    name:       { type: String },
    category:   { type: String },
    gifts:      { type: Array },
    img:        { data: Buffer,     contentType: String},
    imgName:    { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

export default mongoose.model("Interest", InterestSchema);