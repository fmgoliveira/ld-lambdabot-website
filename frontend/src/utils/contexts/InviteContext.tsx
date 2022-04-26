import { createContext } from "react";

type InviteContextType = {
    url: string;
    setUrl: (url: string) => void;
}

export const InviteContext = createContext<InviteContextType>({
    url: '',
    setUrl: () => {},
})