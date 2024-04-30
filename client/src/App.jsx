import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-800 font-serif p-4">
          <nav className="flex justify-center py-2">
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route
            path="/login"
            element={
              <div className="p-2">
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="p-2">
                <Register />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
