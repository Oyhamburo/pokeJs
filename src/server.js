import express from "express"
import passport from "passport";
import mongoose from "mongoose";
import cors from 'cors' 
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { engine } from "express-handlebars";
import { createServer as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { socketEvent } from "./utils/chat/socketEvent.js";
import { sessionMongo } from "./middlewares/index.middleware.js";
import {
    npcRouter,
    objectRouter,
    userRouter,
    pcRouter,
    inventoryRouter
} from "./routes/index.routes.js";

dotenv.config()

const PORT = process.env.PORT || 3040;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:477";

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
socketEvent(io)

// USES

app.use(cors())
app.use(cookieParser());
app.use(sessionMongo);
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use("/", userRouter);
app.use("/api/npc", npcRouter)
app.use("/api/object", objectRouter)
app.use("/api/pc", pcRouter)
app.use("/api/inventory", inventoryRouter)





httpServer.listen(PORT, async () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected DB", MONGO_URI);
    } catch (error) {
        console.log(`Error en conexión de Base de datos: ${error}`);
    }
})