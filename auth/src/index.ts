import { app } from "./app"
import sequelize from "./config/database"
import User from "./models/user.model"

const port = 3000
const start = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await User.sync()
    console.log("Models have been synced with the database.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

start()
