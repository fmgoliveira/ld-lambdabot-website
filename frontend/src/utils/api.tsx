import axios from "axios";

const CONFIG = { headers: { 'Access-Control-Allow-Origin': 'https://bot-beta.lambdadev.xyz' } }

export const getAuthStatus = () => axios.get(`https://test.lambdadev.xyz/api/auth/status`, CONFIG)
export const getGuilds = () => axios.get(`https://test.lambdadev.xyz/api/guilds`, CONFIG)
export const getGuild = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/guilds/${guildId}`, CONFIG)
export const getInsightsDashboardData = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/insights/${guildId}/dashboard`, CONFIG)
export const getInsightsMembers = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/insights/${guildId}/members`, CONFIG)
export const getInsightsActions = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/insights/${guildId}/logs`, CONFIG)
export const getModuleData = (guildId: string, module: string) => axios.get(`https://test.lambdadev.xyz/api/manage/${guildId}/${module}`, CONFIG)
export const postModuleData = (guildId: string, module: string, data: any) => axios.post(`https://test.lambdadev.xyz/api/manage/${guildId}/${module}`, { data }, CONFIG)
export const getGuildChannels = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/guilds/${guildId}/channels`, CONFIG)
export const getGuildCategories = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/guilds/${guildId}/categories`, CONFIG)
export const getGuildRoles = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/guilds/${guildId}/roles`, CONFIG)
export const getGuildMembers = (guildId: string) => axios.get(`https://test.lambdadev.xyz/api/guilds/${guildId}/members`, CONFIG)
export const getBotStats = () => axios.get(`https://test.lambdadev.xyz/api/bot/stats`, CONFIG)