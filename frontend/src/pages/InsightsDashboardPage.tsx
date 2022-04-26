import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useFetchInsightsDashboardData } from "../utils/hooks/useFetchInsightsDashboardData"
import { User } from "../utils/typings/User"
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip)

export const InsightsDashboardPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { data, loading } = useFetchInsightsDashboardData(guildId)
  if (loading || !data) return <Spinner />

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
                <h4 className="text-center mb-3">Statistics</h4>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col-8 col-lg-6">
                          <div className="dash-icon bg-info">
                            <span className="material-icons">people</span>
                          </div>
                          <div className="mt-3">
                            <b>Total Members</b>
                          </div>
                          <h3 className="mt-2">{data.members}</h3>
                        </div>
                        <div className="col-4 col-lg-6">
                          <div className="dash-chart">
                            <Doughnut data={{
                              labels: ['Humans', 'Bots'],
                              datasets: [{
                                data: [data.humans, data.bots],
                                backgroundColor: [
                                  '#ffa726',
                                  '#1a73e8'
                                ],
                                borderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                hoverBorderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                borderWidth: 6,
                              }]
                            }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <small>Humans: <span className="text-primary text-bold">{data.humans}</span><br />Bots: <span className="text-info text-bold">{data.bots}</span></small>
                      </div>
                      <div className="row"></div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 mt-2 mt-lg-0">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col-8 col-lg-6">
                          <div className="dash-icon bg-danger">
                            <span className="material-icons">tag</span>
                          </div>
                          <div className="mt-3">
                            <b>Total Channels</b>
                          </div>
                          <h3 className="mt-2">{data.channels}</h3>
                        </div>
                        <div className="col-4 col-lg-6">
                          <div className="dash-chart">
                            <Doughnut data={{
                              labels: ['Text Channels', 'Voice Channels'],
                              datasets: [{
                                data: [data.textChannels, data.voiceChannels],
                                backgroundColor: [
                                  '#ffa726',
                                  '#f44335'
                                ],
                                borderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                hoverBorderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                borderWidth: 6,
                              }]
                            }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <small>Text Channels: <span className="text-primary text-bold">{data.textChannels}</span><br />Voice Channels: <span className="text-danger text-bold">{data.voiceChannels}</span></small>
                      </div>
                      <div className="row"></div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 mt-2 mt-lg-0">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col-8 col-lg-6">
                          <div className="dash-icon bg-success">
                            <span className="material-icons">manage_accounts</span>
                          </div>
                          <div className="mt-3">
                            <b>Total Roles</b>
                          </div>
                          <h3 className="mt-2">{data.roles}</h3>
                        </div>
                        <div className="col-4 col-lg-6">
                          <div className="dash-chart">
                            <Doughnut data={{
                              labels: ['User Created Roles', 'System Roles'],
                              datasets: [{
                                data: [data.userRoles, data.systemRoles],
                                backgroundColor: [
                                  '#ffa726',
                                  '#4caf50'
                                ],
                                borderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                hoverBorderColor: [
                                  '#2f3136',
                                  '#2f3136'
                                ],
                                borderWidth: 6,
                              }]
                            }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <small>User Created Roles: <span className="text-primary text-bold">{data.userRoles}</span><br />System/Integration Roles: <span className="text-success text-bold">{data.systemRoles}</span></small>
                      </div>
                      <div className="row"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body shadow-sm dash-card p-4">
                <h4 className="text-center mb-3">Server Growth</h4>
                <div className="row">
                  <div className="col">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="dash-icon-sm bg-success me-3">
                              <span className="material-icons">person_add_alt_1</span>
                            </div>
                            <div>
                              <b>Server Joins</b>
                              <br />
                              <small className="text-muted">Last 24 Hours</small>
                            </div>
                          </div>
                          <div className="me-4 text-6xl my-n4 text-white text-bold">{data.join24}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="dash-icon-sm bg-danger me-3">
                              <span className="material-icons">person_remove</span>
                            </div>
                            <div>
                              <b>Server Leaves</b>
                              <br />
                              <small className="text-muted">Last 24 Hours</small>
                            </div>
                          </div>
                          <div className="me-4 text-6xl my-n4 text-white text-bold">{data.leave24}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="dash-icon-sm bg-success me-3">
                              <span className="material-icons">person_add_alt_1</span>
                            </div>
                            <div>
                              <b>Server Joins</b>
                              <br />
                              <small className="text-muted">Last 7 Days</small>
                            </div>
                          </div>
                          <div className="me-4 text-6xl my-n4 text-white text-bold">{data.join7}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="dash-icon-sm bg-danger me-3">
                              <span className="material-icons">person_remove</span>
                            </div>
                            <div>
                              <b>Server Leaves</b>
                              <br />
                              <small className="text-muted">Last 7 Days</small>
                            </div>
                          </div>
                          <div className="me-4 text-6xl my-n4 text-white text-bold">{data.leave7}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card card-body shadow-sm dash-card p-4">
                <h4 className="text-center mb-3">Latest Actions</h4>
                {
                  data.latestActions.map((action, index) =>
                    <div className={index === 0 ? 'row' : 'row mt-2'}>
                      <div className="col">
                        <div className="card card-body">
                          <div className="d-flex align-items-center">
                            <img src={`https://cdn.discordapp.com/avatars/${action.user.id}/${action.user.avatar}.png`} className="avatar me-3" alt="" />
                            <div className="text-sm text-light">
                              <b>{action.user.username}#{action.user.discriminator}</b> updated the <span className="text-primary">{action.module}</span> module settings.
                              <br />
                              <small className="text-xs text-muted">{new Date(parseInt(action.timestamp) * 1000).toLocaleString()}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <div className="card card-body shadow-sm dash-card p-4">
                <h4 className="text-center mb-3">Latest Joins</h4>
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
                          data.latestMembers.map((member) => <tr>
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
                                    <h6 className="mb-0 text-xs text-white">{member.nick || member.user?.username}</h6>
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
                              {member.fullRoles.map((role) => <span className="badge mx-1" style={{ "background": role.color === '#000000' ? '#2f3136' : role.color + "70", "color": role.color === '#000000' ? '#f4f4f5' : role.color }}>@{role.name}</span>)}
                            </td>
                          </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                  <a href="/insights/members" className="link text-sm text-center mt-2">Show All</a>
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