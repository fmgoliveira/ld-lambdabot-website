import { Spinner } from "../../components/spinner"

export const Invite = ({ guildId, redirectUrl }: { guildId?: string, redirectUrl?: string }) => {
  if (guildId && guildId !== "") {
    if (redirectUrl && redirectUrl !== "") switch (redirectUrl) {
      case "api_invite":
        window.location.replace(`https://discord.com/oauth2/authorize?client_id=900398063607242762&permissions=1118741982327&redirect_uri=${encodeURIComponent(`https://bot.lambdadev.xyz/api/invite/redirect`)
          }& response_type=code & scope=bot % 20applications.commands & guild_id=${guildId} `)
        break
    }
    else window.location.replace(`https://discord.com/oauth2/authorize?client_id=900398063607242762&permissions=1118741982327&redirect_uri=https%3A%2F%2Fdiscord.gg%2FzqBF8Wv5Pg&response_type=code&scope=bot%20applications.commands&guild_id=${guildId}`)
  } else window.location.replace(`https://discord.com/oauth2/authorize?client_id=900398063607242762&permissions=1118741982327&redirect_uri=https%3A%2F%2Fdiscord.gg%2FzqBF8Wv5Pg&response_type=code&scope=bot%20applications.commands`)
  return <Spinner />
}

export const Docs = () => {
  window.location.replace("https://wiki.lambdadev.xyz/bot")
  return <Spinner />
}

export const Support = () => {
  window.location.replace("https://discord.com/invite/zqBF8Wv5Pg")
  return <Spinner />
}

export const Cmds = () => {
  window.location.replace("https://wiki.lambdadev.xyz/bot/commands")
  return <Spinner />
}

export const Terms = () => {
  window.location.replace("https://wiki.lambdadev.xyz/legal/terms")
  return <Spinner />
}

export const Policy = () => {
  window.location.replace("https://wiki.lambdadev.xyz/legal/policy")
  return <Spinner />
}

export const Login = () => {
  window.location.replace(`https://bot.lambdadev.xyz/api/auth/login`)
  return <Spinner />
}

export const Logout = () => {
  window.location.replace(`https://bot.lambdadev.xyz/api/auth/logout`)
  return <Spinner />
}

export const RedirectToServers = () => {
  window.location.replace('/servers')
  return <Spinner />
}

export const RedirectToIndex = () => {
  window.location.replace('/')
  return <Spinner />
}
