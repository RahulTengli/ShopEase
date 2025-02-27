import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routers.js"
import { dbConnect } from "./utils/db.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
dotenv.config();

//dbconnection
dbConnect();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api',routes);
app.use('/api/cart',cartRoutes);

app.listen(process.env.PORT ,()=>{
    console.log(`server is running at port ${process.env.PORT}`);
});