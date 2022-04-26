export type PartialRole = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  menionable: boolean;
  tags?: {
    bot_id?: boolean;
    integration_id?: boolean;
    premium_subscriber?: boolean;
  }[];
};