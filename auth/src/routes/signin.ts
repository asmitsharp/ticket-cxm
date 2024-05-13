import jwt from "jsonwebtoken"
import { validateRequest, BadRequestError } from "@ticketscx/common"
import express, { Request, Response } from "express"
import { Password } from "../services/password"
import User from "../models/user.model"
import { body } from "express-validator"

const router = express.Router()
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({
      where: { email: `${email}` },
      rejectOnEmpty: true,
    })
    if (existingUser === null) {
      console.log("Not found!")
    } else {
      console.log(existingUser instanceof User) // true
      console.log(existingUser.email)
    }
    console.log("existingUser :", existingUser)
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials")
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials!!")
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt,
    }

    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
