import express from "express"
import jwt from "jsonwebtoken"

import { currentUser } from "@ticketscx/common"

const router = express.Router()

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log(req.currentUser)
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
