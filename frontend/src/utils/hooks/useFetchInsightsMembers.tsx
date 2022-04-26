import { useEffect, useState } from "react";
import { getInsightsMembers } from "../api";
import { PartialMember } from "../typings/PartialMember";

export function useFetchInsightsMembers(guildId: string) {
  const [insightsMembersData, setInsightsMembersData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInsightsMembers(guildId)
      .then(({ data }) => {
        setInsightsMembersData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    members: insightsMembersData as PartialMember[] | undefined,
    error,
    loading
  }
}