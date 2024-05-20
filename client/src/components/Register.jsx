import React, { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { validateRegisterForm } from "../utils/validateRegisterForm"
import { handleError } from "../utils/handleError"

const Register = () => {
  const { register, error } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    role: "user",
  })
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("test1")
    console.log(formData)
    const errors = validateRegisterForm(formData)
    console.log(errors)
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    if (Object.keys(errors).length === 0) {
      try {
        await register(
          formData.email,
          formData.password,
          formData.firstname,
          formData.lastname,
          formData.role
        )
      } catch (err) {
        handleError(err)
      }
    } else {
      setFormErrors(errors)
    }
  }

  return (
    <div className="font-serif min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 font-serif italic text-center text-3xl font-extrabold text-gray-400">
            Welcome to CXM-Ticket – Your Platform for Seamless Ticket Management
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for an account
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
            )}
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>
            )}
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {formErrors.confirmPassword}
              </p>
            )}
            <label htmlFor="firstname" className="sr-only">
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            {formErrors.firstname && (
              <p className="mt-2 text-sm text-red-600">
                {formErrors.firstname}
              </p>
            )}
            <label htmlFor="lastname" className="sr-only">
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
            {formErrors.lastname && (
              <p className="mt-2 text-sm text-red-600">{formErrors.lastname}</p>
            )}
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
            {formErrors.role && (
              <p className="mt-2 text-sm text-red-600">{formErrors.role}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-800"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
