import { Router } from 'express';
import { Vote } from '../../database/schemas';
import bodyParser from 'body-parser';

const router = Router();

router.post("/discordswebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.BOTSFORDISCORD_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { user, bot } = req.body;

  if (bot !== process.env.DISCORD_CLIENT_ID) return;
  const timestamp = Date.now();

  if ((await Vote.find({ userId: user })).length > 0) await Vote.create({
    userId: user,
    timestamp: timestamp + (await Vote.find({ userId: user })).length * 12 * 60 * 60 * 1000,
    list: "botsfordiscord",
  });
  else await Vote.create({
    userId: user,
    timestamp,
    list: "botsfordiscord",
  });
});

router.post("/topggwebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.TOP_GG_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { user, bot, type } = req.body;

  if (bot !== process.env.DISCORD_CLIENT_ID) return;
  if (type === "test") return;
  const timestamp = Date.now();

  if ((await Vote.find({ userId: user })).length > 0) await Vote.create({
    userId: user,
    timestamp: timestamp + (await Vote.find({ userId: user })).length * 12 * 60 * 60 * 1000,
    list: "topgg",
  });
  else await Vote.create({
    userId: user,
    timestamp,
    list: "topgg",
  });
});

router.post("/infinitybotswebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.INFINITY_BOTS_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { userID, botID, type } = req.body;

  if (botID !== process.env.DISCORD_CLIENT_ID) return;
  if (type === "TEST") return;
  const timestamp = Date.now();

  if ((await Vote.find({ userId: userID })).length > 0) await Vote.create({
    userId: userID,
    timestamp: timestamp + (await Vote.find({ userId: userID })).length * 12 * 60 * 60 * 1000,
    list: "infinitybots",
  });
  else await Vote.create({
    userId: userID,
    timestamp,
    list: "infinitybots",
  });
});

router.post("/discordlabswebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.DISCORD_LABS_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { uid, bid, test } = req.body;

  if (bid !== process.env.DISCORD_CLIENT_ID) return;
  if (test) return;
  const timestamp = Date.now();

  if ((await Vote.find({ userId: uid })).length > 0) await Vote.create({
    userId: uid,
    timestamp: timestamp + (await Vote.find({ userId: uid })).length * 12 * 60 * 60 * 1000,
    list: "discordlabs",
  });
  else await Vote.create({
    userId: uid,
    timestamp,
    list: "discordlabs",
  });
});

export default router;