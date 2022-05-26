import { Router } from 'express';
import { Donator } from '../../database/schemas';
import bodyParser from 'body-parser';

const router = Router();

router.post("/webhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.DONATING_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { txn_id, status, recurring, buyer_email, price, currency, raw_buyer_id, role_id, guild_id, } = req.body;

  if (guild_id !== process.env.LAMBDA_GUILD_ID) return;
  const timestamp = Date.now();

  const isSubscription = status === 'Completed' && recurring === '1' && role_id === process.env.PREMIUM_ROLE;
  const isSubscriptionEnd = status === 'sub_ended';
  const isLifetime = status === 'Completed' && recurring === '0' && role_id === process.env.DONATOR_ROLE;

  if (!isSubscription && !isSubscriptionEnd && !isLifetime) return;
  if (isSubscription) await Donator.create({
    buyerEmail: buyer_email,
    price: `${currency} ${price}`,
    timestamp,
    txn_id,
    type: 'subscription',
    userId: raw_buyer_id || undefined
  });
  if (isSubscriptionEnd) await Donator.findOneAndDelete({ userId: raw_buyer_id || undefined, roleId: process.env.PREMIUM_ROLE, type: 'subscription' });
  if (isLifetime) await Donator.create({
    buyerEmail: buyer_email,
    price: `${currency} ${price}`,
    timestamp,
    txn_id,
    type: 'lifetime',
    userId: raw_buyer_id || undefined
  });
});

export default router;