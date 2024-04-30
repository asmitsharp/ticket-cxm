const express = require("express")
const cors = require("cors")
const pool = require("./config/db-config")
const register_controller = require("./controllers/auth/register_controllers")
const login_controller = require("./controllers/auth/login_controller")

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.post("/api/register", register_controller)
app.post("/api/login", login_controller)

app.listen(port, async () => {
  try {
    await pool.connect()
    console.log("Database Connected")
  } catch (error) {
    console.error("Error connecting to database:", error)
    process.exit(1)
  }
  console.log(`Server is running on port ${port}`)
})
