import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import cookieSession from "cookie-session"

import { errorHandler, NotFoundError, currentUser } from "@ticketscx/common"
import { viewassignRouter } from "./routes/view-assign"
import { ticketreplyRouter } from "./routes/ticket-reply"
import { ticketrepliesRouter } from "./routes/ticket-replies"
import { ticketraiseRouter } from "./routes/ticket-raise"
import { closeRouter } from "./routes/close"

const app = express()
app.set("trust proxy", true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
)

app.use(currentUser)

app.use(ticketrepliesRouter)
app.use(ticketraiseRouter)
app.use(closeRouter)
app.use(ticketreplyRouter)
app.use(viewassignRouter)

app.all("*", async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
