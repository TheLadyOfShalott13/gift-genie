import GiftRequest from "../models/GiftRequest.js";
import Gift from "../models/Gift.js";
import Person from "../models/Person.js";

export const createGiftRequest = async (req, res, next) => {
    const newGiftRequest = new GiftRequest(req.body)

    try {
        const savedGiftRequest = await newGiftRequest.save();
        res.status(200).json(savedGiftRequest);
    }
    catch (err) {
        next(err)
    }
}

export const updateGiftRequest = async (req, res, next) => {
    try {
        try {
            const updatedGiftRequest = await GiftRequest.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedGiftRequest);
        } catch (err) {
            next(err);
        }
    }
    catch (err) {
        next(err)
    }
}

export const getOneGiftRequest = async (req, res, next) => {
    const reqId = req.params.id;
    let response = {};

    try {
        const giftRequest = await GiftRequest.find({ _id: reqId });
        const persons = await Person.find({ _id: giftRequest[0].giftee });
        const gifts = await Gift.find({ _id: giftRequest[0].gift })
        response = giftRequest.map( (r) => { return {...r._doc, "gift_name" : gifts[0].name, "giftee_name": persons[0].name } } );
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//get all gift requests by status
export const getAllGiftRequests = async (req, res, next) => {
    const status = req.params.status;

    let personNames = {};
    let giftNames = {};
    let giftRequestList = [];

    try {
        const giftRequest = await GiftRequest.find({ "status": status }); //multiple parameters for selection, and check for when second parameter is a list
        const persons = await Person.find();
        const gifts = await Gift.find(); // can be optimized further later on

        persons.map( (p) => personNames[p._id] = p.name );
        gifts.map( (g) => giftNames[g._id] = g.name );
        giftRequestList = giftRequest.map( (r) => { return {...r._doc, "gift_name" : giftNames[r.gift], "giftee_name": personNames[r.giftee] }});

        res.status(200).json(giftRequestList);
    } catch (err) {
        next(err)
    }
}

//there shall be no delete gift request here
//any modifications to gift request must undergo 2 steps
//delete and then create anew