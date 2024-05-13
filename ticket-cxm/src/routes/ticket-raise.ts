import express, { Request, Response } from "express"
import Ticket from "../models/ticket.model"
import axios from "axios"
import { requireAuth, validateRequest } from "@ticketscx/common"
import { body } from "express-validator"

const router = express.Router()
// User Story 2.1: Raise a Ticket
router.post(
  "/api/tickets",
  requireAuth,
  [
    body("subject").notEmpty().withMessage("Subject must be given."),
    body("userId").notEmpty().withMessage("Subject must be given."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { subject, description, priority, userId } = req.body
      console.log(req.body)
      // Call the User API in the auth microservice to verify the user ID
      const userResponse = await axios.get(
        `http://auth-srv:3000/api/users/${userId}`
      )
      const user = userResponse.data

      if (!user) {
        return res.status(400).json({ error: "Invalid user ID" })
      }

      const ticket = await Ticket.create({
        subject,
        description,
        priority,
        status: "open",
        userId: user.id,
      })

      res.status(201).json(ticket)
    } catch (err) {
      console.error("Error creating ticket:", err)
      res.status(400).json({ error: err })
    }
  }
)
