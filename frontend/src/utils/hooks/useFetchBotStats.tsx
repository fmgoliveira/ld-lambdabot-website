import { useEffect, useState } from "react";
import { getBotStats } from "../api";

export function useFetchBotStats() {
  const [stats, setStats] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getBotStats()
      .then(({ data }) => {
        setStats(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    stats: stats as {
      guildCountStr: string;
      guildCount: number;
      memberCountStr: string;
      userCount: number;
      channelCount: number;
      shardCount: number;
    } | undefined,
    error,
    loading
  }
}