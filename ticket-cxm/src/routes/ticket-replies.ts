import express, { Request, Response } from "express"
import { requireAuth, validateRequest } from "@ticketscx/common"
import { body } from "express-validator"

import Ticket from "../models/ticket.model"
import TicketReply from "../models/ticketReply.model"

const router = express.Router()
// User Story 2.2: View Ticket Replies
router.get(
  "/api/tickets/:ticketId/replies",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const ticketId = parseInt(req.params.ticketId)
      const ticket = await Ticket.findByPk(ticketId)

      // Checking if Ticket exist or not
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
      }

      // Querying all the replies from database for the ticket
      const replies = await TicketReply.findAll({
        where: {
          ticketId: ticket.id,
        },
        attributes: ["id", "message", "createdAt"], // Include desired attributes
      })
      res.json(replies)
    } catch (err) {
      res.status(400).json({ error: err })
    }
  }
)

export { router as ticketrepliesRouter }
