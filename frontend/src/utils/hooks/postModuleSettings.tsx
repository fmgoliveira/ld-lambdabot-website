import { Store } from "react-notifications-component"
import { postModuleData } from "../api"

export const postModuleSettings = async (guildId: string, module: string, _data: any, notifStore: typeof Store) => {
  postModuleData(guildId, module, _data).then(({ data }) => {
    notifStore.addNotification({
      message: data.error || 'Successfully updated settings.',
      type: data.error ? "danger" : "success",
      container: 'bottom-right',
      insert: 'bottom',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true,
      },
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
    })
  }).catch((err) => {
    notifStore.addNotification({
      message: err.response.data,
      type: "danger",
      container: 'bottom-right',
      insert: 'bottom',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true,
      },
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
    })
  })
}