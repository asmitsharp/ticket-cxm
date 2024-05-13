import sequelize from "./config/database"
import Ticket from "./models/ticket.model"
import { app } from "./app"

const port = 3000
const start = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await Ticket.sync()
    console.log("Models have been synced with the database.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

start()
