import { useState } from "react"
import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useManageModuleData } from "../utils/hooks/useManageModuleData"
import { User } from "../utils/typings/User"
import Select from 'react-select'
import { useFetchChannels } from "../utils/hooks/useFetchChannels"
import { Store } from 'react-notifications-component';
import { postModuleSettings } from "../utils/hooks/postModuleSettings"
import { useFetchRoles } from "../utils/hooks/useFetchRoles"
import { Tooltip } from "@mui/material"

export const ManageLevelsPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "levels")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { roles, loading: loading3 } = useFetchRoles(guildId)

  const [levelsEnabled, setLevelsEnabled] = useState()
  const [levelsChannel, setLevelsChannel] = useState()
  const [levelsChannelChannel, setLevelsChannelChannel] = useState()
  const [levelsMessage, setLevelsMessage] = useState()
  const [roleRewardsStack, setRoleRewardsStack] = useState()

  const [rankCommand, setRankCommand] = useState()
  const [leaderboardCommand, setLeaderboardCommand] = useState()
  const [giveXpCommand, setGiveXpCommand] = useState()
  const [removeXpCommand, setRemoveXpCommand] = useState()
  const [setXpCommand, setSetXpCommand] = useState()

  const [roleRewardsObjArray, setRoleRewardsObjArray] = useState([])
  const [roleStr, setRoleStr] = useState()
  const [levelStr, setLevelStr] = useState('')

  const xpRates = [
    { value: .25, label: '0.25x' },
    { value: .5, label: '0.5x' },
    { value: .75, label: '0.75x' },
    { value: 1, label: '1x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' },
    { value: 2.5, label: '2.5x' },
    { value: 3, label: '3x' },
  ]

  if (loading || loading2 || loading3 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case "levelsEnabled":
        data.settings.enabled = checked
        setLevelsEnabled(checked)
        postModuleSettings(guildId, 'levels', data, Store)
        break
      case 'levelsMessage':
        setLevelsMessage(value)
        break
      case 'roleRewardsStack':
        data.settings.roleRewardsStack = checked
        setRoleRewardsStack(checked)
        postModuleSettings(guildId, 'levels', data, Store)
        break

      case 'rankCommand':
        data.commands.rank = checked
        setRankCommand(value)
        postModuleSettings(guildId, 'levels', data, Store)
        break
      case 'leaderboardCommand':
        data.commands.leaderboard = checked
        setLeaderboardCommand(value)
        postModuleSettings(guildId, 'levels', data, Store)
        break
      case 'giveXpCommand':
        data.commands.giveXp = checked
        setGiveXpCommand(value)
        postModuleSettings(guildId, 'levels', data, Store)
        break
      case 'removeXpCommand':
        data.commands.removeXp = checked
        setRemoveXpCommand(value)
        postModuleSettings(guildId, 'levels', data, Store)
        break
      case 'setXpCommand':
        data.commands.setXp = checked
        setSetXpCommand(value)
        postModuleSettings(guildId, 'levels', data, Store)
        break

      case 'roleRewardsObjLevel':
        setLevelStr(String(value))
        break

      default:
        break
    }
  }

  const handleLevelUpAnnouncementSelectChange = (value: any) => {
    setLevelsChannel(value?.value)
    if (value?.value !== 'custom') {
      data.settings.channel = value?.value
      postModuleSettings(guildId, 'levels', data, Store)
    } else if (levelsChannelChannel) {
      data.settings.channel = levelsChannelChannel
      postModuleSettings(guildId, 'levels', data, Store)
    }
  }

  const handleLevelsChannelSelectChange = (value: any) => {
    setLevelsChannelChannel(value?.value)
    data.settings.channel = value?.value
    postModuleSettings(guildId, 'levels', data, Store)
  }

  const handleSaveLevelsMessage = (e: any) => {
    e.preventDefault()
    data.settings.message = levelsMessage
    postModuleSettings(guildId, 'levels', data, Store)
  }

  const handleRoleRewardsRoleSelectChange = (value: any) => {
    setRoleStr(value?.value)
  }

  const handleDeleteRoleRewardsObj = (e: any) => {
    e.preventDefault()
    const { id } = e.target
    let obj = data.settings.roleRewards.filter((obj: any) => obj.level === parseInt(id))[0]
    data.settings.roleRewards.splice(data.settings.roleRewards.indexOf(obj), 1)
    setRoleRewardsObjArray(data.settings.roleRewards)
    postModuleSettings(guildId, 'levels', data, Store)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleEditRoleRewardsObj = (e: any) => {
    let obj = data.settings.roleRewards.filter((obj: any) => obj.level === parseInt(e.target.name))[0]
    let index = data.settings.roleRewards.indexOf(obj)
    let newObj = obj

    newObj.role = roleStr ? roleStr : data.settings.roleRewards[index].role
    data.settings.roleRewards[index] = newObj
    setRoleRewardsObjArray(data.settings.roleRewards)
    postModuleSettings(guildId, 'levels', data, Store)
    setRoleStr(undefined)
  }

  const handleAddRoleRewardsObj = (e: any) => {
    if (!roleStr || !levelStr || levelStr === '') return Store.addNotification({
      title: 'Error',
      message: 'Please fill out all fields',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
    })
    if (data.settings.roleRewards.some((e: { level: number, role: string }) => e.level === parseInt(levelStr))) return Store.addNotification({
      title: 'Error',
      message: 'That level already exists',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
    })
    if (parseInt(levelStr) < 1 || parseInt(levelStr) > 100) return Store.addNotification({
      title: 'Error',
      message: 'Level must be between 1 and 100',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
    })
    let newObj = {
      role: roleStr,
      level: parseInt(levelStr)
    }

    data.settings.roleRewards.push(newObj)
    setRoleRewardsObjArray(data.settings.roleRewards)
    postModuleSettings(guildId, 'levels', data, Store)
    setRoleStr(undefined)
    setLevelStr('')
  }

  const handleXpRateSelectChange = (value: any) => {
    data.settings.xpRate = value?.value
    postModuleSettings(guildId, 'levels', data, Store)
  }

  const handleNoXpRolesSelectChange = (value: any) => {
    data.settings.noXpRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'levels', data, Store)
  }

  const handleNoXpChannelsSelectChange = (value: any) => {
    data.settings.noXpChannels = value.map((channel: any) => channel.value)
    postModuleSettings(guildId, 'levels', data, Store)
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Levels Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">General Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={levelsEnabled || data.settings.enabled} id="levelsEnabled" name="levelsEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="levelsEnabled">Enable/Disable Module</label>
                </div>
                <label htmlFor="levelUpAnnouncement" className="text-light mt-3">Level Up Announcement</label>
                <Select
                  defaultValue={data.settings.channel === 'current' ? { value: 'current', label: 'Current Channel' } : data.settings.channel === 'disabled' ? { value: 'disabled', label: 'Disabled' } : data.settings.channel === 'dm' ? { value: 'dm', label: 'Direct Message' } : { value: 'custom', label: 'Custom Channel' }}
                  name="levelUpAnnouncement"
                  id="levelUpAnnouncement"
                  options={[
                    { value: 'disabled', label: 'Disabled' },
                    { value: 'current', label: 'Current Channel' },
                    { value: 'dm', label: 'Direct Message' },
                    { value: 'custom', label: 'Custom Channel' }
                  ]}
                  className='channel-role-select text-sm'
                  onChange={handleLevelUpAnnouncementSelectChange}
                  placeholder="Select Channel"
                  styles={{
                    option: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                      color: state.isFocused ? '#fff' : '#fff',
                      cursor: "pointer",
                      borderColor: '#2f3136',
                    }),
                    singleValue: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#2f3136',
                      cursor: "pointer",
                      borderColor: '#444444',
                    }),
                  }}
                />
                <div className={levelsChannel === 'custom' ? 'd-block' : 'd-none'}>
                  <label htmlFor="levelsChannel" className="text-light mt-3">Channel</label>
                  <Select
                    name="levelsChannel"
                    id="levelsChannel"
                    options={channels?.map(c => { return { value: c.id, label: '#' + c.name } })}
                    className='channel-role-select text-sm'
                    onChange={handleLevelsChannelSelectChange}
                    placeholder="Select Channel"
                    styles={{
                      option: (provided: any, state: any) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                        color: state.isFocused ? '#fff' : '#fff',
                        cursor: "pointer",
                        borderColor: '#2f3136',
                      }),
                      singleValue: (provided: any, state: any) => ({
                        ...provided,
                        color: '#fff',
                      }),
                      control: (provided: any, state: any) => ({
                        ...provided,
                        color: '#fff',
                        backgroundColor: '#2f3136',
                        cursor: "pointer",
                        borderColor: '#444444',
                      }),
                    }}
                  />
                </div>
                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                  <label className="text-light text-xs" htmlFor="levelsMessage">
                    Message
                  </label>
                  <textarea maxLength={2000} rows={3} className="form-control ms-auto text-white" value={levelsMessage || data.settings.message} id="levelsMessage" name="levelsMessage" onChange={handleChange} />
                </div>
                <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                  <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                  <span>Learn about the <span className="text-white">placeholders</span></span>
                  <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                </a>
                <div>
                  <button className="btn btn-primary btn-sm mt-4" onClick={handleSaveLevelsMessage}>Save</button>
                </div>
              </div>
              <div className="card card-body dash-card mt-4 p-4">
                <h4 className="text-center">Commands</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={rankCommand || data.commands.rank} id="rankCommand" name="rankCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="rankCommand">Get a user's rank <br /> <code>/rank [user]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={leaderboardCommand || data.commands.leaderboard} id="leaderboardCommand" name="leaderboardCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="leaderboardCommand">Check the server levels leaderboard <br /> <code>/leaderboard</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveXpCommand || data.commands.giveXp} id="giveXpCommand" name="giveXpCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveXpCommand">Give XP to a user <br /> <code>/xp give &lt;user&gt; &lt;amount&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={removeXpCommand || data.commands.removeXp} id="removeXpCommand" name="removeXpCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="removeXpCommand">Remove XP from a user <br /> <code>/xp remove &lt;user&gt; &lt;amount&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={setXpCommand || data.commands.setXp} id="setXpCommand" name="setXpCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="setXpCommand">Set a user's XP <br /> <code>/xp set &lt;user&gt; &lt;amount&gt;</code></label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">XP Role Rewards</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={roleRewardsStack || data.settings.roleRewardsStack} id="roleRewardsStack" name="roleRewardsStack" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="roleRewardsStack">Stack XP Role Rewards</label>
                </div>
                {
                  roleRewardsObjArray.length > 0 ?
                    roleRewardsObjArray.map((roleRewardsObj: { level: number, role: string }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + roleRewardsObj.level} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Role Reward for Level {roleRewardsObj.level}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Level</label>
                                  <input className="form-control text-light" disabled value={roleRewardsObj.level} />
                                </div>
                                <label htmlFor="roleRewardsRole" className="text-light mt-3">Role</label>
                                <Select
                                  defaultValue={roles?.filter(r => roleRewardsObj.role === r.id).map(r => { return { value: r.id, label: '@' + r.name } })}
                                  name="roleRewardsRole"
                                  id="roleRewardsRole"
                                  options={roles?.map(r => { return { value: r.id, label: '@' + r.name } })}
                                  className='channel-role-select text-sm'
                                  onChange={handleRoleRewardsRoleSelectChange}
                                  placeholder="Select Role"
                                  styles={{
                                    option: (provided: any, state: any) => ({
                                      ...provided,
                                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                                      color: state.isFocused ? '#fff' : '#fff',
                                      cursor: "pointer",
                                      borderColor: '#2f3136',
                                    }),
                                    singleValue: (provided: any, state: any) => ({
                                      ...provided,
                                      color: '#fff',
                                    }),
                                    control: (provided: any, state: any) => ({
                                      ...provided,
                                      color: '#fff',
                                      backgroundColor: '#2f3136',
                                      cursor: "pointer",
                                      borderColor: '#444444',
                                    }),
                                  }}
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditRoleRewardsObj} name={roleRewardsObj.level.toString()}>Save changes</button>
                                <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) :
                    data.settings.roleRewards.map((roleRewardsObj: { level: number, role: string }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + roleRewardsObj.level} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Role Reward for Level {roleRewardsObj.level}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Level</label>
                                  <input className="form-control text-light" disabled value={roleRewardsObj.level} />
                                </div>
                                <label htmlFor="roleRewardsRole" className="text-light mt-3">Role</label>
                                <Select
                                  defaultValue={roles?.filter(r => roleRewardsObj.role === r.id).map(r => { return { value: r.id, label: '@' + r.name } })}
                                  name="roleRewardsRole"
                                  id="roleRewardsRole"
                                  options={roles?.map(r => { return { value: r.id, label: '@' + r.name } })}
                                  className='channel-role-select text-sm'
                                  onChange={handleRoleRewardsRoleSelectChange}
                                  placeholder="Select Role"
                                  styles={{
                                    option: (provided: any, state: any) => ({
                                      ...provided,
                                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                                      color: state.isFocused ? '#fff' : '#fff',
                                      cursor: "pointer",
                                      borderColor: '#2f3136',
                                    }),
                                    singleValue: (provided: any, state: any) => ({
                                      ...provided,
                                      color: '#fff',
                                    }),
                                    control: (provided: any, state: any) => ({
                                      ...provided,
                                      color: '#fff',
                                      backgroundColor: '#2f3136',
                                      cursor: "pointer",
                                      borderColor: '#444444',
                                    }),
                                  }}
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditRoleRewardsObj} name={roleRewardsObj.level.toString()}>Save changes</button>
                                <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                }
                <div className="table table-responsive mt-">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 text-center">ID</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Level</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Role</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        roleRewardsObjArray.length > 0 ?
                          roleRewardsObjArray.map((roleRewardsObj: { level: number; role: string }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">{roleRewardsObj.level}</td>
                                <td className='text-sm text-light'>@{roles?.filter(r => roleRewardsObj.role === r.id)[0].name}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + roleRewardsObj.level}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={roleRewardsObj.level.toString()} onClick={handleDeleteRoleRewardsObj} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
                                  </Tooltip>
                                </td>
                              </tr>
                            )
                          }) :
                          data.settings.roleRewards.map((roleRewardsObj: { level: number; role: string }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">{roleRewardsObj.level}</td>
                                <td className='text-sm text-light'>@{roles?.filter(r => roleRewardsObj.role === r.id)[0].name}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + roleRewardsObj.level}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={roleRewardsObj.level.toString()} onClick={handleDeleteRoleRewardsObj} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
                                  </Tooltip>
                                </td>
                              </tr>
                            )
                          })
                      }
                    </tbody>
                  </table>
                </div>
                <div className="modal fade" id="modal-create" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                  <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">Add Role Reward</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="modal-body text-light">
                        <div>
                          <div className="input-group input-group-static mt-3">
                            <label className="text-light">Level</label>
                            <input type="number" min={1} max={100} className="form-control text-light" name="roleRewardsObjLevel" onChange={handleChange} value={levelStr} />
                          </div>
                          <label htmlFor="roleRewardsObjRole" className="text-light mt-3">Role</label>
                          <Select
                            defaultValue={null}
                            name="roleRewardsObjRole"
                            id="roleRewardsObjRole"
                            options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                            className='channel-role-select text-sm text-light'
                            onChange={handleRoleRewardsRoleSelectChange}
                            placeholder="Select Role"
                            styles={{
                              option: (provided: any, state: any) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                                color: state.isFocused ? '#fff' : '#fff',
                                cursor: "pointer",
                                borderColor: '#2f3136',
                              }),
                              singleValue: (provided: any, state: any) => ({
                                ...provided,
                                color: '#fff',
                              }),
                              control: (provided: any, state: any) => ({
                                ...provided,
                                color: '#fff',
                                backgroundColor: '#2f3136',
                                cursor: "pointer",
                                borderColor: '#444444',
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleAddRoleRewardsObj} name={levelStr}>Add Role Reward</button>
                        <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-icon bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" data-bs-toggle="modal" data-bs-target='#modal-create'>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="material-icons ms-2" aria-hidden="true">add</i>
                    Add Role Reward
                  </div>
                </div>
              </div>
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">XP Gathering Settings</h4>
                <label htmlFor="xpRate" className="text-light mt-3">XP Rate</label>
                <Select
                  defaultValue={xpRates.filter(r => data.settings.xpRate === r.value)[0]}
                  name="xpRate"
                  id="xpRate"
                  options={xpRates}
                  className='channel-role-select text-sm'
                  onChange={handleXpRateSelectChange}
                  placeholder="Select Rate"
                  styles={{
                    option: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                      color: state.isFocused ? '#fff' : '#fff',
                      cursor: "pointer",
                      borderColor: '#2f3136',
                    }),
                    singleValue: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#2f3136',
                      cursor: "pointer",
                      borderColor: '#444444',
                    }),
                  }}
                />

                <label htmlFor="noXpRoles" className="text-light mt-3">Roles that don't get XP</label>
                <Select
                  defaultValue={roles?.filter(r => data.settings.noXpRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="noXpRoles"
                  id="noXpRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleNoXpRolesSelectChange}
                  placeholder="Select Roles"
                  styles={{
                    option: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                      color: state.isFocused ? '#fff' : '#fff',
                      cursor: "pointer",
                      borderColor: '#2f3136',
                    }),
                    multiValueLabel: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#36393f',
                    }),
                    multiValueRemove: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: state.isFocused ? 'lightpink' : '#36393f',
                    }),
                    multiValue: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: '#36393f',
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#2f3136',
                      cursor: "pointer",
                      borderColor: '#444444',
                    }),
                  }}
                />
                <label htmlFor="noXpChannels" className="text-light mt-3">Channels where users don't get XP</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.noXpChannels.includes(c.id)).map(c => { return { value: c.id, label: '#' + c.name } })}
                  isMulti
                  name="noXpChannels"
                  id="noXpChannels"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleNoXpChannelsSelectChange}
                  placeholder="Select Channels"
                  styles={{
                    option: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#36393f' : '#2f3136',
                      color: state.isFocused ? '#fff' : '#fff',
                      cursor: "pointer",
                      borderColor: '#2f3136',
                    }),
                    multiValueLabel: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#36393f',
                    }),
                    multiValueRemove: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: state.isFocused ? 'lightpink' : '#36393f',
                    }),
                    multiValue: (provided: any, state: any) => ({
                      ...provided,
                      backgroundColor: '#36393f',
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      color: '#fff',
                      backgroundColor: '#2f3136',
                      cursor: "pointer",
                      borderColor: '#444444',
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </div >
  )
}