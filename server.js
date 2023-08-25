import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connection from "./configs/db.js"
import errorHandler from "./middleware/errorHandlerMiddleware.js";
import movieRouter from "./routes/movieRouter.js";

dotenv.config();
const PORT = 8080;
const app = express();

app.use(morgan("dev"));
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true }));
app.use(cors())

app.use("/movie",movieRouter);
// app.use("/tour",tourRouter);



app.get("/", async (req, res) => {
    res.send("welcome to the world!");
});


app.use(errorHandler);


app.listen(PORT, ()=> {
    connection()
    console.log('listening on port '+ PORT);
})