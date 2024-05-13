import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"
import Ticket from "./ticket.model"

interface TicketReplyAttributes {
  id?: number
  ticketId: number
  userId: number
  message: string
  createdAt?: Date
}

interface TicketReplyCreationAttributes
  extends Optional<TicketReplyAttributes, "id"> {}

class TicketReply
  extends Model<TicketReplyAttributes, TicketReplyCreationAttributes>
  implements TicketReplyAttributes
{
  public id!: number
  public ticketId!: number
  public userId!: number
  public message!: string
  public readonly createdAt!: Date
}

TicketReply.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Ticket,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TicketReply",
    tableName: "ticket_replies",
    timestamps: true,
  }
)

export default TicketReply
