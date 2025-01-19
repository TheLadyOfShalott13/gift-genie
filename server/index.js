import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

import userRoute from "./routes/user.js";
import giftRoute from "./routes/gift.js";
import interestRoute from "./routes/interest.js";
import personRoute from "./routes/person.js";
import giftRequestRoute from "./routes/giftrequest.js";

const app = express();
app.use("/uploads", express.static("uploads"));
dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/',
    (req, res) => { res.send('Hello from Express!') });

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(morgan("common"));

//include controller routes
app.use("/api/users", userRoute);
app.use("/api/gift", giftRoute);
app.use("/api/interest", interestRoute);
app.use("/api/person", personRoute);
app.use("/api/giftRequest", giftRequestRoute);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
    connect();
});
