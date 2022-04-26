import { useEffect, useState } from "react";
import { getGuildMembers } from "../api";
import { PartialMember } from "../typings/PartialMember";

export function useFetchMembers(guildId: string) {
  const [members, setMembers] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuildMembers(guildId)
      .then(({ data }) => {
        setMembers(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    members: members as PartialMember[] | [] | undefined,
    error,
    loading
  }
}