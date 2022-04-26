import { useEffect, useState } from "react";
import { getGuildCategories } from "../api";
import { PartialChannel } from "../typings/PartialChannel";

export function useFetchCategories(guildId: string) {
  const [categories, setCategories] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGuildCategories(guildId)
      .then(({ data }) => {
        setCategories(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId])

  return {
    categories: categories as PartialChannel[] | [] | undefined,
    error,
    loading
  }
}