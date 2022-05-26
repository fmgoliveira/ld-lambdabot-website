import mongoose, { Schema } from 'mongoose';

export interface Donator {
  id: string;

  userId: string;
  type: 'lifetime' | 'subscription';
  timestamp: string;
  buyerEmail: string;
  txn_id: string;
  price: string;
}

const DonatorSchema = new Schema<Donator>({
  userId: { type: String, required: false, default: "" },
  type: { type: String, required: true },
  timestamp: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  txn_id: { type: String, required: true },
  price: { type: String, required: true },
});

export default mongoose.model('donators', DonatorSchema);