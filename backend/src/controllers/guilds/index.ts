import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getGuildCategories, getGuildChannels, getGuildMembers, getGuildRoles, getMutualGuildsService, getUserGuildsService } from "../../services/guilds";
import { PartialGuild } from "../../utils/types";

export async function getGuildsController(req: Request, res: Response) {
  const user = req.user as User;

  try {
    const guilds = await getMutualGuildsService(user.id);
    res.status(200).send({ guilds });
  } catch (err) {
    console.log(err);
    res.sendStatus(400).send({ msg: "Error" })
  }
}

export async function getGuild(req: Request, res: Response) {
  const user = req.user as User;
  const guildId = req.params.guildId;

  const { data: guilds } = await getUserGuildsService(user.id);
  const guild = guilds.filter((g: PartialGuild) => g.id === guildId)[0];

  res.status(200).send(guild);
}

export async function getChannels(req: Request, res: Response) {
  const guildId = req.params.guildId;
  const channels = await getGuildChannels(guildId);

  res.status(200).send(channels);
}

export async function getCategories(req: Request, res: Response) {
  const guildId = req.params.guildId;
  const channels = await getGuildCategories(guildId);

  res.status(200).send(channels);
}

export async function getRoles(req: Request, res: Response) {
  const guildId = req.params.guildId;
  const roles = await getGuildRoles(guildId);

  res.status(200).send(roles);
}

export async function getMembers(req: Request, res: Response) {
  const guildId = req.params.guildId;
  const members = await getGuildMembers(guildId);

  res.status(200).send(members);
}