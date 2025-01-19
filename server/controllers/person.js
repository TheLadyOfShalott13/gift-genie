import Person from "../models/Person.js";
import {ObjectId} from "mongodb";

export const createPerson = async (req, res, next) => {
    const newPerson = new Person(req.body)

    try {
        const savedPerson = await newPerson.save();
        res.status(200).json(savedPerson);
    }
    catch (err) {
        next(err)
    }
}

export const deletePerson = async (req, res, next) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        res.status(200).json("The person has been deleted. (Though hopefully not from your life)");
    } catch (err) {
        next(err);
    }
};

export const getBirthdays = async (req, res, next) => {
    const month = req.body.month;
    const userId = req.params.userId;
    let data = {};

    try {
        const result = await Person.aggregate([
            {$project: {name: 1, imgName:1, user:1, month: {$month: '$birthday'}, birthday: {$dayOfMonth: '$birthday'}}},
            {$match: { $and: [{month: month},{user: new ObjectId(userId)}]} }
        ]);
        result.map(function(p){
            if (typeof data[p.birthday] === 'undefined') data[p.birthday] = [];
            data[p.birthday] = [...data[p.birthday], p];
        })
        res.status(200).json(data);
    } catch (err) {
        next(err)
    }
}

export const updatePerson = async (req, res, next) => {
    const form_data = req.body;
    try {
        if (Object.hasOwnProperty.bind(form_data)('interests')) {
            if (form_data['interests'].trim() !== "")
                form_data['interests'] = form_data['interests'].split(',');
            else
                form_data['interests'] = [];
        }
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            { $set: form_data },
            { new: true }
        );
        res.status(200).json(person);
    } catch (err) {
        next(err);
    }
}

//get all persons
export const getAllPersons = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const persons = await Person.find({user:userId});
        res.status(200).json(persons);
    } catch (err) {
        next(err)
    }
}

export const getOnePerson = async (req, res, next) => {
    const personId = req.params.id;

    try {
        const person = await Person.find({ _id: personId });
        res.status(200).json(person);
    } catch (err) {
        next(err)
    }
}