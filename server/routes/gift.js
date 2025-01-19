import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import {
    createGift,
    updateGift,
    deleteGift,
    getOneGift,
    getAllGifts,
    getMultipleByIds
} from "../controllers/gift.js";

const router = express.Router();

const upload = multer({storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})});

//==========Routes accepting raw JSON==============//
router.delete("/delete/:id", deleteGift);
router.get("/get/:id/", getOneGift);
router.get("/list/:userId", getAllGifts);
router.post("/getMultipleByIds", getMultipleByIds);

//==========Routes accepting form data==============//
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post("/create", upload.single('img'), createGift);
router.put("/update/:id", upload.single('img'), updateGift);

export default router;