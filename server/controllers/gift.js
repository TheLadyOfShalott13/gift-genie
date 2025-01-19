import Gift from "../models/Gift.js";

export const createGift = async (req, res, next) => {
    const newGift = new Gift(req.body)

    try {
        const savedGift = await newGift.save();
        res.status(200).json(savedGift);
    }
    catch (err) {
        next(err)
    }
}

export const deleteGift = async (req, res, next) => {
    try {
        await Gift.findByIdAndDelete(req.params.id);
        res.status(200).json("The selected gift has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getMultipleByIds = async (req, res, next) => {
    const giftIds = req.body.ids;

    try {
        const interests = await Gift.find({ "_id": {"$in": giftIds } }); //gift is an array/list
        res.status(200).json(interests);
    } catch (err) {
        next(err)
    }
}

//get one gift
export const getOneGift = async (req, res, next) => {
    const giftId = req.params.id;

    try {
        const gift = await Gift.find({_id:giftId}); //gift is an array/list
        res.status(200).json(gift);
    } catch (err) {
        next(err)
    }
}

//get all gifts
export const getAllGifts = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const gifts = await Gift.find({user:userId});
        res.status(200).json(gifts);
    } catch (err) {
        next(err)
    }
}

export const updateGift = async (req, res, next) => {

    try {
        const gift = await Gift.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(gift);
    } catch (err) {
        next(err);
    }
}