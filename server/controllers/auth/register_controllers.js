const express = require("express")
const pool = require("../../config/db-config")
const bcrypt = require("bcrypt")

const register_controller = async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body
  const client = await pool.connect()
  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await client.query(
      "INSERT INTO users (email, password, firstname, lastname, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, hashedPassword, firstname, lastname, role]
    )

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = register_controller
