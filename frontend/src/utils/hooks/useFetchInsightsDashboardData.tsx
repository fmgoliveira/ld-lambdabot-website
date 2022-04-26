import { useEffect, useState } from "react";
import { getInsightsDashboardData } from "../api";
import { InsightsDashboardData } from "../typings/InsightsDashboardData";

export function useFetchInsightsDashboardData(guildId: string) {
  const [insightsDashboardData, setInsightsDashboardData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInsightsDashboardData(guildId)
      .then(({ data }) => {
        setInsightsDashboardData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    data: insightsDashboardData as InsightsDashboardData | undefined,
    error,
    loading
  }
}