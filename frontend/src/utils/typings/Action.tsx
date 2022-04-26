export type Action = {
  guildId: string;
  action: string;
  timestamp: string;
  module: string;
  user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
}