import { useEffect, useState } from "react";
import { getAuthStatus } from "../api";

export function useFetchUser() {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAuthStatus()
      .then(({ data }) => {
        setUser(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { user, error, loading }
}