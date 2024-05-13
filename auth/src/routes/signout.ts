import jwt from "jsonwebtoken"

import { validateRequest } from "@ticketscx/common"

import { BadRequestError } from "@ticketscx/common"
import express from "express"
//import { Password } from "../services/password";

const router = express.Router()

export { router as signoutRouter }
