import sequelize from "./config/database"
import Ticket from "./models/ticket.model"
import TicketReply from "./models/ticketReply.model"
import { app } from "./app"
import mongoose from "mongoose"

const port = 3000
const start = async () => {
  // const mongoURI = "mongodb://mongo-srv:27017/db"
  try {
    await mongoose.connect("mongodb://mongo-srv:27017/db")
    console.log("Connected to mongoDB")
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await Ticket.sync()
    await TicketReply.sync()
    console.log("Models have been synced with the database.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(process.env.POSTGRES_PASSWORD)
  })
}

start()
