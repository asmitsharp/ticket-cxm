const express = require("express")
const pool = require("../../config/db-config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login_controller = async (req, res) => {
  const { email, password } = req.body
  const client = await pool.connect()
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    )
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    const userData = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      firstname: user.rows[0].firstname,
      lastname: user.rows[0].lastname,
      role: user.rows[0].role,
    }

    res.json({ token, user: userData })
  } catch (error) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    client.release()
  }
}

module.exports = login_controller
