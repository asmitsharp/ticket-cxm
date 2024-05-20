import express, { Request, Response } from "express"
import axios from "axios"
import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from "@ticketscx/common"
import { body } from "express-validator"
// import multer, { FileFilterCallback } from "multer"
import path from "path"
import fs from "fs"
import mongoose from "mongoose"

import Ticket from "../models/ticket.model"
import Attachment from "../models/attachement.model"
import AttachmentFile from "../models/attachement-file.model"

const router = express.Router()

// Setting up Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination?: string) => void) => {
//     const uploadDir = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename?: string) => void) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("attachment")

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

      // Checking if user exists or not
      if (!user) {
        return res.status(400).json({ error: "Invalid user ID" })
      }

      // Ticket Created
      const ticket = await Ticket.create({
        subject,
        description,
        priority,
        status: "open",
        userId: user.id,
      })

      // Attachement bieng uploaded
      // if (req.file) {
      //   const attachment = {
      //     ticketId: ticket.id,
      //     filename: req.file.filename,
      //     fileType: req.file.mimetype,
      //     fileSize: req.file.size,
      //   }
      //   const createdAttachment = await Attachment.create(attachment)

      //   const filePath = path.join(
      //     __dirname,
      //     "uploads",
      //     createdAttachment.filename
      //   )
      //   const fileData = fs.readFileSync(filePath)
      //   await AttachmentFile.create({
      //     attachmentId: createdAttachment.id,
      //     fileData,
      //   })
      //   fs.unlinkSync(filePath)
      // }

      res.status(201).json(ticket)
    } catch (err) {
      throw new BadRequestError("Error while creating the ticket!!")
      res.status(400).json({ error: err })
    }
  }
)

export { router as ticketraiseRouter }
