import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"
import Ticket from "./ticket.model"
import TicketReply from "./ticketReply.model"

interface AttachmentAttributes {
  id?: number
  ticketId?: number
  replyId?: number
  filename: string
  fileType: string
  fileSize: number
  createdAt?: Date
}

interface AttachmentCreationAttributes
  extends Optional<AttachmentAttributes, "id"> {}

class Attachment
  extends Model<AttachmentAttributes, AttachmentCreationAttributes>
  implements AttachmentAttributes
{
  public id!: number
  public ticketId!: number | undefined
  public replyId!: number | undefined
  public filename!: string
  public fileType!: string
  public fileSize!: number
  public readonly createdAt!: Date
}

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: Ticket,
        key: "id",
      },
    },
    replyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: TicketReply,
        key: "id",
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Attachment",
    tableName: "attachments",
    timestamps: true,
  }
)

export default Attachment
