//** React Imports
import { useCallback, useContext } from "react"

import { AbilityContext } from "@src/utility/context/Can"

export const useCheckPermission = () => {
  const ability = useContext(AbilityContext)

  const checkPermission = useCallback((action, screen) => {
    return ability.can(action, screen)
  }, [])

  return { checkPermission }
}
