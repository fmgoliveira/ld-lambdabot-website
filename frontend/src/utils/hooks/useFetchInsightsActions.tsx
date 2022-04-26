import { useEffect, useState } from "react";
import { getInsightsActions } from "../api";
import { Action } from "../typings/Action";

export function useFetchInsightsActions(guildId: string) {
  const [insightsActionsData, setInsightsActionsData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInsightsActions(guildId)
      .then(({ data }) => {
        setInsightsActionsData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    actions: insightsActionsData as Action[] | undefined,
    error,
    loading
  }
}