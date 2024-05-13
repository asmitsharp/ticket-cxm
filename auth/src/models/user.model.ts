import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"
import { Password } from "../services/password"

interface UserAttributes {
  id?: number
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public email!: string
  public password!: string
  public first_name!: string
  public last_name!: string
  public role!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Timestamps
  public readonly deletedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true, // Enables soft deletion
  }
)

User.beforeCreate(async (user, options) => {
  const hashedPassword = await Password.toHash(user.password)
  user.password = hashedPassword
})

export default User
