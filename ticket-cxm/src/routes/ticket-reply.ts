import express, { Request, Response } from "express"
import { requireAuth, validateRequest } from "@ticketscx/common"
import { body } from "express-validator"

import Ticket from "../models/ticket.model"
import TicketReply from "../models/ticketReply.model"

const router = express.Router()

router.post(
  "/api/tickets/:ticketId/reply",
  requireAuth,
  [
    body("message").notEmpty().withMessage("Subject must be given."),
    body("userId").notEmpty().withMessage("userId must be given."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const ticketId = parseInt(req.params.ticketId)
      const { userId, message } = req.body
      const ticket = await Ticket.findByPk(ticketId)

      // Checking if the Ticket exists or not
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
      }

      // Creating a new reply for the ticket
      const reply = await TicketReply.create({
        ticketId,
        userId,
        message,
      })
      res.status(201).json(reply)
    } catch (err) {
      res.status(400).json({ error: err })
    }
  }
)

export { router as ticketreplyRouter }
