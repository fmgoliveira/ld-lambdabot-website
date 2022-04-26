import { Action } from "./Action";
import { PartialMember } from "./PartialMember";

export type InsightsDashboardData = {
  bots: number;
  humans: number;
  members: number;
  channels: number;
  textChannels: number;
  voiceChannels: number;
  roles: number;
  systemRoles: number;
  userRoles: number;
  latestMembers: PartialMember[];
  latestActions: Action[];
  join24: number;
  join7: number;
  leave24: number;
  leave7: number;
};