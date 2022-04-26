import { useEffect, useState } from "react";
import { getGuildChannels } from "../api";
import { PartialChannel } from "../typings/PartialChannel";

export function useFetchChannels(guildId: string) {
  const [channels, setChannels] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuildChannels(guildId)
      .then(({ data }) => {
        setChannels(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    channels: channels as PartialChannel[] | [] | undefined,
    error,
    loading
  }
}