import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

interface TicketAttributes {
  id?: number
  subject: string
  description: string
  priority: string
  status: string
  userId: number // User ID from the auth microservice
  assignedAgentId?: number // User ID from the auth microservice
  createdAt?: Date
  updatedAt?: Date
  closedAt?: Date
}

interface TicketCreationAttributes
  extends Optional<TicketAttributes, "id" | "assignedAgentId" | "closedAt"> {}

class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number
  public subject!: string
  public description!: string
  public priority!: string
  public status!: string
  public userId!: number
  public assignedAgentId!: number | undefined
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public closedAt!: Date | undefined
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    assignedAgentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
  }
)

export default Ticket
