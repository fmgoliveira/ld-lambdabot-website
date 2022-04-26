import { useState } from "react"
import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useManageModuleData } from "../utils/hooks/useManageModuleData"
import { User } from "../utils/typings/User"
import Select from 'react-select'
import { useFetchChannels } from "../utils/hooks/useFetchChannels"
import { Store } from 'react-notifications-component';
import { postModuleSettings } from "../utils/hooks/postModuleSettings"
import { PartialChannel } from "../utils/typings/PartialChannel"
import { Tooltip } from '@mui/material';

export const ManageLoggingPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "logging")
  const { channels, loading: loading2 } = useFetchChannels(guildId)

  const [moderationEnabled, setModerationEnabled] = useState()
  const [banEnabled, setBanEnabled] = useState()
  const [kickEnabled, setKickEnabled] = useState()
  const [unbanEnabled, setUnbanEnabled] = useState()
  const [warnEnabled, setWarnEnabled] = useState()
  const [timeoutEnabled, setTimeoutEnabled] = useState()
  const [moderationColor, setModerationColor] = useState()

  const [serverEventsEnabled, setServerEventsEnabled] = useState()
  const [channelCreateEnabled, setChannelCreateEnabled] = useState()
  const [channelDeleteEnabled, setChannelDeleteEnabled] = useState()
  const [channelUpdateEnabled, setChannelUpdateEnabled] = useState()
  const [roleCreateEnabled, setRoleCreateEnabled] = useState()
  const [roleDeleteEnabled, setRoleDeleteEnabled] = useState()
  const [roleUpdateEnabled, setRoleUpdateEnabled] = useState()
  const [guildUpdateEnabled, setGuildUpdateEnabled] = useState()
  const [serverEventsColor, setServerEventsColor] = useState()

  const [memberEventsEnabled, setMemberEventsEnabled] = useState()
  const [memberJoinEnabled, setMemberJoinEnabled] = useState()
  const [memberLeaveEnabled, setMemberLeaveEnabled] = useState()
  const [rolesUpdateEnabled, setRolesUpdateEnabled] = useState()
  const [nicknameUpdateEnabled, setNicknameUpdateEnabled] = useState()
  const [memberEventsColor, setMemberEventsColor] = useState()

  const [messageEventsEnabled, setMessageEventsEnabled] = useState()
  const [messageUpdateEnabled, setMessageUpdateEnabled] = useState()
  const [messageDeleteEnabled, setMessageDeleteEnabled] = useState()
  const [messagePinEnabled, setMessagePinEnabled] = useState()
  const [messageEventsColor, setMessageEventsColor] = useState()

  if (loading || loading2 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case 'moderationEnabled':
        data.settings.moderation.enabled = checked
        setModerationEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'banEnabled':
        data.settings.moderation.events.ban = checked
        setBanEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'kickEnabled':
        data.settings.moderation.events.kick = checked
        setKickEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'unbanEnabled':
        data.settings.moderation.events.unban = checked
        setUnbanEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'warnEnabled':
        data.settings.moderation.events.warn = checked
        setWarnEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'timeoutEnabled':
        data.settings.moderation.events.timeout = checked
        setTimeoutEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'moderationColor':
        setModerationColor(value)
        break

      case 'serverEventsEnabled':
        data.settings.serverEvents.enabled = checked
        setServerEventsEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'channelCreateEnabled':
        data.settings.serverEvents.events.channelCreate = checked
        setChannelCreateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'channelDeleteEnabled':
        data.settings.serverEvents.events.channelDelete = checked
        setChannelDeleteEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'channelUpdateEnabled':
        data.settings.serverEvents.events.channelUpdate = checked
        setChannelUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'roleCreateEnabled':
        data.settings.serverEvents.events.roleCreate = checked
        setRoleCreateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'roleDeleteEnabled':
        data.settings.serverEvents.events.roleDelete = checked
        setRoleDeleteEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'roleUpdateEnabled':
        data.settings.serverEvents.events.roleUpdate = checked
        setRoleUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'guildUpdateEnabled':
        data.settings.serverEvents.events.guildUpdate = checked
        setGuildUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'serverEventsColor':
        setServerEventsColor(value)
        break

      case 'memberEventsEnabled':
        data.settings.memberEvents.enabled = checked
        setMemberEventsEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'memberJoinEnabled':
        data.settings.memberEvents.events.memberJoin = checked
        setMemberJoinEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'memberLeaveEnabled':
        data.settings.memberEvents.events.memberLeave = checked
        setMemberLeaveEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'rolesUpdateEnabled':
        data.settings.memberEvents.events.rolesUpdate = checked
        setRolesUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'nicknameUpdateEnabled':
        data.settings.memberEvents.events.nicknameUpdate = checked
        setNicknameUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'memberEventsColor':
        setMemberEventsColor(value)
        break

      case 'messageEventsEnabled':
        data.settings.messageEvents.enabled = checked
        setMessageEventsEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'messageUpdateEnabled':
        data.settings.messageEvents.events.messageUpdate = checked
        setMessageUpdateEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'messageDeleteEnabled':
        data.settings.messageEvents.events.messageDelete = checked
        setMessageDeleteEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'messagePinEnabled':
        data.settings.messageEvents.events.messagePin = checked
        setMessagePinEnabled(checked)
        postModuleSettings(guildId, 'logging', data, Store)
        break
      case 'messageEventsColor':
        setMessageEventsColor(value)
        break

      default:
        break
    }
  }

  const handleModerationChannelSelect = (value: any) => {
    data.settings.moderation.channel = value?.value || ''
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleServerEventsChannelSelect = (value: any) => {
    data.settings.serverEvents.channel = value?.value || ''
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleMemberEventsChannelSelect = (value: any) => {
    data.settings.memberEvents.channel = value?.value || ''
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleMessageEventsChannelSelect = (value: any) => {
    data.settings.messageEvents.channel = value?.value || ''
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleSaveModerationColor = (e: any) => {
    data.settings.moderation.color = moderationColor || '#000000'
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleSaveServerEventsColor = (e: any) => {
    data.settings.serverEvents.color = serverEventsColor || '#000000'
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleSaveMemberEventsColor = (e: any) => {
    data.settings.memberEvents.color = memberEventsColor || '#000000'
    postModuleSettings(guildId, 'logging', data, Store)
  }

  const handleSaveMessageEventsColor = (e: any) => {
    data.settings.messageEvents.color = messageEventsColor || '#000000'
    postModuleSettings(guildId, 'logging', data, Store)
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Logging Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Moderation Logging</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={moderationEnabled || data.settings.moderation.enabled} id="moderationEnabled" name="moderationEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="moderationEnabled">Enable/Disable Category</label>
                </div>
                <label htmlFor="moderationChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.moderation.channel === c.id).map(c => ({ value: c.id, label: '#' + c.name}))}
                  name="moderationChannel"
                  id="moderationChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm text-light'
                  onChange={handleModerationChannelSelect}
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
                    })
                  }}
                />
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <label className="text-light text-xs" htmlFor="moderationColor">
                        Message Embed Colour
                      </label>
                      <input type='color' className="form-control ms-auto text-white cursor-pointer" value={moderationColor || data.settings.moderation.color} id="moderationColor" name="moderationColor" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-sm mt-2 mb-n2" onClick={handleSaveModerationColor}>Save</button>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="ms-1">Moderation Events</h6>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={banEnabled || data.settings.moderation.events.ban} id="banEnabled" name="banEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="banEnabled">On Ban Command Use</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={unbanEnabled || data.settings.moderation.events.unban} id="unbanEnabled" name="unbanEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="unbanEnabled">On Member Unban</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={kickEnabled || data.settings.moderation.events.kick} id="kickEnabled" name="kickEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="kickEnabled">On Kick Command Use</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={warnEnabled || data.settings.moderation.events.warn} id="warnEnabled" name="warnEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="warnEnabled">On Warn Command Use</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={timeoutEnabled || data.settings.moderation.events.timeout} id="timeoutEnabled" name="timeoutEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="timeoutEnabled">On Timeout Command Use</label>
                  </div>
                </div>

              </div>
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Member Events Logging</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={memberEventsEnabled || data.settings.memberEvents.enabled} id="memberEventsEnabled" name="memberEventsEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="memberEventsEnabled">Enable/Disable Category</label>
                </div>
                <label htmlFor="memberEventsChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.memberEvents.channel === c.id).map(c => ({ value: c.id, label: '#' + c.name}))}
                  name="memberEventsChannel"
                  id="memberEventsChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm text-light'
                  onChange={handleMemberEventsChannelSelect}
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
                    })
                  }}
                />
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <label className="text-light text-xs" htmlFor="memberEventsColor">
                        Message Embed Colour
                      </label>
                      <input type='color' className="form-control ms-auto text-white cursor-pointer" value={memberEventsColor || data.settings.memberEvents.color} id="memberEventsColor" name="memberEventsColor" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-sm mt-2 mb-n2" onClick={handleSaveMemberEventsColor}>Save</button>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="ms-1">Member Events</h6>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={memberJoinEnabled || data.settings.memberEvents.events.memberJoin} id="memberJoinEnabled" name="memberJoinEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="memberJoinEnabled">On Member Join</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={memberLeaveEnabled || data.settings.memberEvents.events.memberLeave} id="memberLeaveEnabled" name="memberLeaveEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="memberLeaveEnabled">On Member Leave</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={rolesUpdateEnabled || data.settings.memberEvents.events.rolesUpdate} id="rolesUpdateEnabled" name="rolesUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="rolesUpdateEnabled">On Member Roles Update</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={nicknameUpdateEnabled || data.settings.memberEvents.events.nicknameUpdate} id="nicknameUpdateEnabled" name="nicknameUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="nicknameUpdateEnabled">On Member Nickname Update</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Message Events Logging</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={messageEventsEnabled || data.settings.messageEvents.enabled} id="messageEventsEnabled" name="messageEventsEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="messageEventsEnabled">Enable/Disable Category</label>
                </div>
                <label htmlFor="messageEventsChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.messageEvents.channel === c.id).map(c => ({ value: c.id, label: '#' + c.name}))}
                  name="messageEventsChannel"
                  id="messageEventsChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm text-light'
                  onChange={handleMessageEventsChannelSelect}
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
                    })
                  }}
                />
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <label className="text-light text-xs" htmlFor="messageEventsColor">
                        Message Embed Colour
                      </label>
                      <input type='color' className="form-control ms-auto text-white cursor-pointer" value={messageEventsColor || data.settings.messageEvents.color} id="messageEventsColor" name="messageEventsColor" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-sm mt-2 mb-n2" onClick={handleSaveMessageEventsColor}>Save</button>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="ms-1">Message Events</h6>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={messageUpdateEnabled || data.settings.messageEvents.events.messageUpdate} id="messageUpdateEnabled" name="messageUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="messageUpdateEnabled">On Message Edit</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={messageDeleteEnabled || data.settings.messageEvents.events.messageDelete} id="messageDeleteEnabled" name="messageDeleteEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="messageDeleteEnabled">On Message Delete</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={messagePinEnabled || data.settings.messageEvents.events.messagePin} id="messagePinEnabled" name="messagePinEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="messagePinEnabled">On Message Pin</label>
                  </div>
                </div>

              </div>
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Server Events Logging</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={serverEventsEnabled || data.settings.serverEvents.enabled} id="serverEventsEnabled" name="serverEventsEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="serverEventsEnabled">Enable/Disable Category</label>
                </div>
                <label htmlFor="serverEventsChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.serverEvents.channel === c.id).map(c => ({ value: c.id, label: '#' + c.name}))}
                  name="serverEventsChannel"
                  id="serverEventsChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm text-light'
                  onChange={handleServerEventsChannelSelect}
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
                    })
                  }}
                />
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <label className="text-light text-xs" htmlFor="serverEventsColor">
                        Message Embed Colour
                      </label>
                      <input type='color' className="form-control ms-auto text-white cursor-pointer" value={serverEventsColor || data.settings.serverEvents.color} id="serverEventsColor" name="serverEventsColor" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-sm mt-2 mb-n2" onClick={handleSaveServerEventsColor}>Save</button>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="ms-1">Server Events</h6>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={channelCreateEnabled || data.settings.serverEvents.events.channelCreate} id="channelCreateEnabled" name="channelCreateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="channelCreateEnabled">On Channel Create</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={channelDeleteEnabled || data.settings.serverEvents.events.channelDelete} id="channelDeleteEnabled" name="channelDeleteEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="channelDeleteEnabled">On Channel Delete</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={channelUpdateEnabled || data.settings.serverEvents.events.channelUpdate} id="channelUpdateEnabled" name="channelUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="channelUpdateEnabled">On Channel Update</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={roleCreateEnabled || data.settings.serverEvents.events.roleCreate} id="roleCreateEnabled" name="roleCreateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="roleCreateEnabled">On Role Create</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={roleDeleteEnabled || data.settings.serverEvents.events.roleDelete} id="roleDeleteEnabled" name="roleDeleteEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="roleDeleteEnabled">On Role Delete</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={roleUpdateEnabled || data.settings.serverEvents.events.roleUpdate} id="roleUpdateEnabled" name="roleUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="roleUpdateEnabled">On Role Update</label>
                  </div>
                  <div className="form-check form-switch ps-0 ms-1">
                    <input className="form-check-input ms-auto mt-1" type="checkbox" checked={guildUpdateEnabled || data.settings.serverEvents.events.guildUpdate} id="guildUpdateEnabled" name="guildUpdateEnabled" onChange={handleChange} />
                    <label className="form-check-label ms-3 text-light" htmlFor="guildUpdateEnabled">On Server Settings Update</label>
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