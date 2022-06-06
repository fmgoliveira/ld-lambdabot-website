import { TextBasedChannel } from 'discord.js';
import { PermissionString } from 'discord.js';
import { client } from '.';

export const checkForBotPermissionInChannel = async (channelId: string, permission: PermissionString, guildId: string) => {
  const member = client.guilds.cache.get(guildId)?.me;
  const channel = await client.channels.fetch(channelId);
  if (!channel) return 0;

  return member?.permissionsIn(channelId)?.has(permission) ? 2 : 1;
}

export const checkForBotPermissionInCategory = async (categoryId: string, permission: PermissionString, guildId: string) => {
  const member = client.guilds.cache.get(guildId)?.me;
  const channel = await client.channels.fetch(categoryId);
  if (!channel) return 0;

  return member?.permissionsIn(categoryId)?.has(permission) ? 2 : 1;
}

export const checkForBotPermissionManageRole = (roleId: string, guildId: string) => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return 0;

  const role = guild.roles.cache.find(r => r.id === roleId);
  if (!role) return 0;
  const rolePosition = role.position;

  if (guild.me?.permissions.has('MANAGE_ROLES') && rolePosition < guild.me?.roles.highest?.position) return 2;
  else return 1;
}