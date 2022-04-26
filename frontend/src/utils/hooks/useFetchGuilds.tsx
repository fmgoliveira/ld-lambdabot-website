import { useEffect, useState } from "react";
import { getGuilds } from "../api";
import { PartialGuild } from "../typings/Guild"

export function useFetchGuilds() {
  const [guilds, setGuilds] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuilds()
      .then(({ data }) => {
        setGuilds(data.guilds)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    guilds: guilds as PartialGuild[] | undefined,
    error,
    loading
  }
}