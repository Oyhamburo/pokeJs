import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? console.error("⛔ Error al conectarse a MongoDB")
        : console.info("🆗 Conectados a MongoDB")
})

export default mongoose 