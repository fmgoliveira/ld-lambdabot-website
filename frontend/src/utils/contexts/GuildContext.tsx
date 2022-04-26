import { createContext } from "react";

type GuildContextType = {
    guildId: string;
    setGuildId: (id: string) => void;
}

export const GuildContext = createContext<GuildContextType>({
    guildId: '',
    setGuildId: () => {},
})