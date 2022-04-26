export type User = {
  _id: string;
  __v: number;

  discordId: string;
  discordUsername: string;
  discordDiscriminator: string;
  discordAvatar: string;
  email: string;

  blacklisted: boolean;
  acceptedPolicy: boolean;

  voted: boolean;
  voteAmount: number;

  accessToken: string;
  refreshToken: string;
};