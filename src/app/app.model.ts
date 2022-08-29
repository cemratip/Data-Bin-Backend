import * as mongoose from 'mongoose';

export const EndpointSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  expiry_time: { type: String, required: true },
  editable: { type: Boolean, required: true },
  passworded: { type: Boolean, required: true },
  password: { type: String, required: false },
  text_content: { type: String, required: false },
});

export interface Endpoint extends mongoose.Document {
  id: string;
  endpoint: string;
  expiry_time: string;
  editable: boolean;
  passworded: boolean;
  password: string;
  text_content: string;
}
