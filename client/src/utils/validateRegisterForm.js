export const validateRegisterForm = (formData, isLogin = false) => {
  const errors = {}

  if (!formData.email) {
    errors.email = "Email is required!"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid"
  }

  if (!formData.password) {
    errors.password = "Password is required"
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long"
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(
      formData.password
    )
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }

  if (!formData.firstname) {
    errors.firstName = "First name is required"
  }

  if (!formData.lastname) {
    errors.lastName = "Last name is required"
  }

  if (!formData.role) {
    errors.role = "Role is required"
  } else if (
    !["admin", "user", "guest"].includes(formData.role.toLowerCase())
  ) {
    errors.role = "Role must be one of: admin, user, guest"
  }

  return errors
}
