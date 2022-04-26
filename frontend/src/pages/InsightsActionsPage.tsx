import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useFetchInsightsActions } from "../utils/hooks/useFetchInsightsActions"
import { User } from "../utils/typings/User"

export const InsightsActionsPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { actions, loading } = useFetchInsightsActions(guildId)
  if (loading || !actions) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card card-body shadow-sm dash-card p-4">
                <h4 className="text-center">Action Logs</h4>
                <div className="row">
                  {
                    actions.length > 0 ?
                      <div className="table-responsive">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9">Member</th>
                              <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9 px-2">User ID</th>
                              <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9 px-2">Date, Time</th>
                              <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9 px-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              actions.map((action) => <tr>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      {
                                        action.user.avatar ?
                                          <img src={`https://cdn.discordapp.com/avatars/${action.user.id}/${action.user.avatar}.webp?size=128`} alt="" className="avatar avatar-sm me-3" /> :
                                          <img src="https://cdn.discordapp.com/attachments/906148996643446825/960883955484200991/unknown.png" alt="" className="avatar avatar-sm me-3" />
                                      }
                                    </div>
                                    <div className="d-flex align-items-center gap-3 justify-content-start">
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-xs text-white">{action.user.username}</h6>
                                        <p className="text-xs text-light mb-0">{action.user.username}#{action.user.discriminator}</p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-xs text-light text-uppercase">
                                  {action.user.id}
                                </td>
                                <td className="text-xs text-light">
                                  {new Date(parseInt(action.timestamp) * 1000).toLocaleString()}
                                </td>
                                <td className="text-xs text-light">
                                  {action.action}
                                </td>
                              </tr>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                      : <div className="col-12 mt-2">
                        <div className="alert alert-warning text-white text-center" role="alert">
                          There are no actions to show. This is likely because you have not changed any settings yet. Start by changing some settings.
                        </div>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </div >
  )
}