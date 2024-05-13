import jwt from "jsonwebtoken"
import { validateRequest, BadRequestError } from "@ticketscx/common"
import express, { Request, Response } from "express"
import { body } from "express-validator"
import User from "../models/user.model"

const router = express.Router()

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, first_name, last_name, role } = req.body
    console.log(req.body)
    const existingUser = await User.findOne({
      where: { email: `${email}` },
    })

    if (existingUser) {
      throw new BadRequestError("Email in use already!")
    }

    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
      role,
    })

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )
    console.log(userJwt)
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
