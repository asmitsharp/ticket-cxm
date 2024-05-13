import express from "express"
import User from "../models/user.model"
import { requireAuth } from "@ticketscx/common"

const router = express.Router()

router.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10)

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const { password, ...userInfo } = user.toJSON()

    res.json(userInfo)
  } catch (error) {
    console.error("Error retrieving user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export { router as userByIdRouter }
