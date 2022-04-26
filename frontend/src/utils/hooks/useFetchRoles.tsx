import { useEffect, useState } from "react";
import { getGuildRoles } from "../api";
import { PartialRole } from "../typings/PartialRole";

export function useFetchRoles(guildId: string) {
  const [roles, setRoles] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuildRoles(guildId)
      .then(({ data }) => {
        setRoles(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    roles: roles as PartialRole[] | [] | undefined,
    error,
    loading
  }
}