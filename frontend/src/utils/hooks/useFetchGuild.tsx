import { useEffect, useState } from "react";
import { getGuild } from "../api";
import { PartialGuild } from "../typings/Guild";

export function useFetchGuild(guildId: string) {
  const [guild, setGuild] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuild(guildId)
      .then(({ data }) => {
        setGuild(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    guild: guild as PartialGuild | undefined,
    error,
    loading
  }
}