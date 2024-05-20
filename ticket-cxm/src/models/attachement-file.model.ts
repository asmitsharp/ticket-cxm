import mongoose, { Schema, Document } from "mongoose"

interface AttachmentFileAttributes extends Document {
  attachmentId: number
  fileData: Buffer
}

const AttachmentFileSchema: Schema = new Schema({
  attachmentId: { type: Number, required: true },
  fileData: { type: Buffer, required: true },
})

const AttachmentFile = mongoose.model<AttachmentFileAttributes>(
  "AttachmentFile",
  AttachmentFileSchema
)

export default AttachmentFile
