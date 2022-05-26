declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: "development" | "production" | "debug";
      DASHBOARD_DOMAIN: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_REDIRECT_URL: string;
      DISCORD_BOT_TOKEN: string;
      MONGO_URL: string;
      LOGS_WEBHOOK_ID: string;
      LOGS_WEBHOOK_TOKEN: string;
      ERROR_WEBHOOK_ID: string;
      ERROR_WEBHOOK_TOKEN: string;
      LAMBDA_GUILD_ID: string;
      DISCORD_LABS_TOKEN: string;
      BOTSFORDISCORD_TOKEN: string;
      TOP_GG_TOKEN: string;
      INFINITY_BOTS_TOKEN: string;
      DISCORD_LABS_WEBHOOK_TOKEN: string;
      BOTSFORDISCORD_WEBHOOK_TOKEN: string;
      TOP_GG_WEBHOOK_TOKEN: string;
      INFINITY_BOTS_WEBHOOK_TOKEN: string;
      VOTED_ROLE: string;
      PREMIUM_ROLE: string;
      DONATOR_ROLE: string;
      DONATING_WEBHOOK_TOKEN: string;
    }
}
}

export { };