import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import {
    createInterest,
    deleteInterest,
    getOneInterest,
    updateInterest,
    getAllInterests,
    getMultipleByIds
} from "../controllers/interest.js";

const router = express.Router();

const upload = multer({storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })});


//==========For routes accepting raw JSON==================//
router.delete("/delete/:id", deleteInterest);
router.get("/get/:id", getOneInterest);
router.get("/list/:userId", getAllInterests);
router.post("/getMultipleByIds", getMultipleByIds);

//==========For routes accepting form data=================//
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post("/create", upload.single('img'), createInterest);
router.put("/update/:id", upload.single('img'), updateInterest);

export default router;