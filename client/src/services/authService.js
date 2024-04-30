import axios from "axios"

const API_URL = "http://localhost:3000/api"

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    const { token, ...user } = response.data
    return { user, token }
  } catch (err) {
    throw new Error("Invalid email or password")
  }
}

const register = async (email, password, firstname, lastname, role) => {
  try {
    await axios.post(`${API_URL}/register`, {
      email,
      password,
      firstname,
      lastname,
      role,
    })
    console.log("User Registered")
  } catch (error) {
    throw new Error("Registration failed")
  }
}

export const authService = {
  login,
  register,
}
