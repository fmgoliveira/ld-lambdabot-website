import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useFetchInsightsMembers } from "../utils/hooks/useFetchInsightsMembers"
import { User } from "../utils/typings/User"

export const InsightsMembersPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { members, loading } = useFetchInsightsMembers(guildId)
  if (loading || !members) return <Spinner />

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
                <h4 className="text-center">Member List</h4>
                <div className="row">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9">Member</th>
                          <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9 ps-2">User ID</th>
                          <th className="text-center text-uppercase text-primary text-xxs font-weight-bolder opacity-9">Joined At</th>
                          <th className="text-uppercase text-primary text-xxs font-weight-bolder opacity-9">Roles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          members.map((member) => <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  {
                                    member.avatar ?
                                      <img src={`https://cdn.discordapp.com/avatars/${member.user?.id}/${member.avatar}.webp?size=128`} alt="" className="avatar avatar-sm me-3" /> :
                                      member.user?.avatar ?
                                        <img src={`https://cdn.discordapp.com/avatars/${member.user?.id}/${member.user?.avatar}.webp?size=128`} alt="" className="avatar avatar-sm me-3" /> :
                                        <img src="https://cdn.discordapp.com/attachments/906148996643446825/960883955484200991/unknown.png" alt="" className="avatar avatar-sm me-3" />
                                  }
                                </div>
                                <div className="d-flex align-items-center gap-3 justify-content-start">
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className={member.displayColor === '#000000' ? "mb-0 text-xs text-white" : "mb-0 text-xs"} style={{ "color": member.displayColor === '#000000' ? '#fff' : member.displayColor }}>{member.nick || member.user?.username}</h6>
                                    <p className="text-xs text-light mb-0">{member.user?.username}#{member.user?.discriminator}</p>
                                  </div>
                                  {
                                    member.user?.bot ?
                                      <span className="text-xxs badge bg-info">Bot</span>
                                      : null
                                  }
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0" style={{ "color": "#ddd" }}>{member.user?.id}</p>
                            </td>
                            <td className="align-middle text-center text-xs text-light">
                              {new Date(member.joined_at).toLocaleString()}
                            </td>
                            <td className="text-xs text-light">
                              {member.fullRoles.map((role) => <span className="badge mx-1" style={{ "background": role.color === '#000000' ? '#2f3136' : role.color + "15", "color": role.color === '#000000' ? '#f4f4f5' : role.color + "ff" }}>@{role.name}</span>)}
                            </td>
                          </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
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