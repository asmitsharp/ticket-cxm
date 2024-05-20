import express, { Request, Response } from "express"
import { requireAuth, validateRequest } from "@ticketscx/common"
import { body } from "express-validator"

import Ticket from "../models/ticket.model"
import TicketReply from "../models/ticketReply.model"

const router = express.Router()

// User Story 3.3: Close Tickets
router.put(
  "/tickets/:ticketId/close",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const ticketId = parseInt(req.params.ticketId)
      const { resolutionSummary } = req.body
      const ticket = await Ticket.findByPk(ticketId)
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
      }
      ticket.status = "closed"
      ticket.closedAt = new Date()

      await ticket.save()
      res.json(ticket)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

export { router as closeRouter }
