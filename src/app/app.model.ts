import * as mongoose from 'mongoose';

export const EndpointSchema = new mongoose.Schema(
  {
    endpoint: { type: String, required: true },
    editable: { type: Boolean, required: true },
    passworded: { type: Boolean, required: true },
    password: { type: String, required: false },
    text_content: { type: String, required: false },
    timeTillExpiry: { type: String, required: true },
    expireAt: { type: Date, expires: 60 },
    createdAt: { type: Date },
  },
  { timestamps: true },
);

export interface Endpoint extends mongoose.Document {
  id: string;
  endpoint: string;
  editable: boolean;
  passworded: boolean;
  password: string;
  text_content: string;
  timeTillExpiry: string;
  expireAt: Date;
  createdAt: Date;
}
