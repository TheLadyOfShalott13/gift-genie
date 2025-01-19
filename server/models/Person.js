import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    name:       	{ type: String,     required: true },
    email:      	{ type: String,     required: true },
    phone:      	{ type: String,     required: true },
    birthday:   	{ type: Date,       required: true },
    address:    	{ type: String,     required: true },
    img:            { type: Buffer,     contentType: String},
    imgName:    	{ type: String,     required: true },
    imp_dates:  	{ type: Array,      required: true },
    interests:  	{ type: Array,      required: false },
	gifts:  	    { type: String,      required: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

export default mongoose.model("Person", PersonSchema);