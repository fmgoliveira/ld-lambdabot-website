import mongoose, { Schema } from 'mongoose';

export interface TicketCategory {
  id: string;
  guildId: string;

  categoryChannel: string;
  label: string;
  maxTickets: number;
  supportRoles: string[];
  welcomeMessage: {
    message: string;
    color: string;
  };
  deleteOnClose: boolean;
  moveToClosedCategory: boolean;
}

const TicketCategorySchema = new Schema<TicketCategory>({
  id: { type: String, required: true, unique: true },

  guildId: { type: String, required: true },

  categoryChannel: { type: String, required: false, default: '' },
  label: { type: String, required: false, default: '' },
  maxTickets: { type: Number, required: false, default: 0 },
  supportRoles: { type: [String], required: false, default: [] },
  welcomeMessage: {
    type: {
      message: { type: String, required: false, default: '' },
      color: { type: String, required: false, default: '#000000' },
    }, required: false,
  },
  deleteOnClose: { type: Boolean, required: false, default: false },
  moveToClosedCategory: { type: Boolean, required: false, default: false },
});

export default mongoose.model('ticketCategories', TicketCategorySchema);