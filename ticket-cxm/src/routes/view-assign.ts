import express, { Request, Response } from "express"
import { body } from "express-validator"
import { isAgent, requireAuth, validateRequest } from "@ticketscx/common"

import Ticket from "../models/ticket.model"
import TicketReply from "../models/ticketReply.model"

const router = express.Router()
// User Story 3.1: View and Assign Tickets

// For getting all tickets that are open
router.get(
  "/api/tickets/open",
  requireAuth,
  isAgent,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.findAll({
        where: {
          status: "open",
        },
        attributes: [
          "id",
          "priority",
          "status",
          "subject",
          "userId",
          "assignedAgentId",
          "createdAt",
        ],
      })
      res.json(tickets)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

// For getting all tickets that are pending
router.get(
  "/api/tickets/pending",
  requireAuth,
  isAgent,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.findAll({
        where: {
          status: "pending",
        },
        attributes: [
          "id",
          "priority",
          "status",
          "subject",
          "userId",
          "assignedAgentId",
          "createdAt",
        ],
      })
      res.json(tickets)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

// For getting all the Tickets
router.get(
  "/api/tickets",
  requireAuth,
  isAgent,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.findAll({
        attributes: [
          "id",
          "priority",
          "status",
          "subject",
          "userId",
          "assignedAgentId",
          "createdAt",
        ],
      })
      res.json(tickets)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

// Assigning tickets to agents
router.put(
  "/tickets/:ticketId/assign",
  requireAuth,
  isAgent,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const ticketId = parseInt(req.params.ticketId)
      const { agentId } = req.body
      const ticket = await Ticket.findByPk(ticketId)
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
      }
      ticket.assignedAgentId = agentId
      await ticket.save()
      res.json(ticket)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

export { router as viewassignRouter }
