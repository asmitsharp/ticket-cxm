import React, { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  const userData = user && user.user ? user.user : null

  return (
    <div>
      <h2>Welcome, {userData.email}!</h2>
      <p>This is the dashboard.</p>
    </div>
  )
}

export default Dashboard
