import { useEffect, useState } from "react";
import { getModuleData } from "../api";

export function useManageModuleData(guildId: string, module: string) {
  const [moduleData, setModuleData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getModuleData(guildId, module)
      .then(({ data }) => {
        setModuleData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [guildId, module])

  return {
    moduleData: moduleData as any,
    setModuleData,
    error,
    loading
  }
}