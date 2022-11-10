import { useState } from "react"
import { Footer, Navbar } from "../components/dashboard"
import { Spinner } from "../components/spinner"
import { useManageModuleData } from "../utils/hooks/useManageModuleData"
import { User } from "../utils/typings/User"
import Select from 'react-select'
import { useFetchChannels } from "../utils/hooks/useFetchChannels"
import { useFetchRoles } from '../utils/hooks/useFetchRoles'
import { Store } from 'react-notifications-component';
import { postModuleSettings } from "../utils/hooks/postModuleSettings"
import { useFetchMembers } from "../utils/hooks/useFetchMembers"

export const ManageModerationPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "moderation")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { roles, loading: loading3 } = useFetchRoles(guildId)
  const { members: users, loading: loading4 } = useFetchMembers(guildId)

  const [includeReason, setIncludeReason] = useState()
  const [dmOnKick, setDmOnKick] = useState()
  const [dmOnBan, setDmOnBan] = useState()
  const [dmOnWarn, setDmOnWarn] = useState()
  const [dmOnTimeout, setDmOnTimeout] = useState()

  const [chatFilterEnabled, setChatFilterEnabled] = useState()
  const [chatFilterWordsStr, setChatFilterWordsStr] = useState('')

  const [altDetectionEnabled, setAltDetectionEnabled] = useState()
  const [altDetectionAccountAge, setAltDetectionAccountAge] = useState()

  const [banCommand, setBanCommand] = useState()
  const [kickCommand, setKickCommand] = useState()
  const [warnCommand, setWarnCommand] = useState()
  const [timeoutCommand, setTimeoutCommand] = useState()
  const [slowmodeCommand, setSlowmodeCommand] = useState()
  const [warningsCommand, setWarningsCommand] = useState()
  const [clearwarnsCommand, setClearwarnsCommand] = useState()
  const [clearCommand, setClearCommand] = useState()

  if (loading || loading2 || loading3 || loading4 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case 'includeReason':
        data.moderation.settings.includeReason = checked
        setIncludeReason(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'dmOnKick':
        data.moderation.settings.dm.kick = checked
        setDmOnKick(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'dmOnBan':
        data.moderation.settings.dm.ban = checked
        setDmOnBan(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'dmOnWarn':
        data.moderation.settings.dm.warn = checked
        setDmOnWarn(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'dmOnTimeout':
        data.moderation.settings.dm.timeout = checked
        setDmOnTimeout(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break

      case 'altDetectionEnabled':
        data.altDetection.settings.enabled = checked
        setAltDetectionEnabled(checked)
        postModuleSettings(guildId, 'alt-detection', data.altDetection, Store)
        break
      case 'altDetectionAccountAge':
        data.altDetection.settings.accountAge = value
        setAltDetectionAccountAge(value)
        break

      case 'chatFilterEnabled':
        data.chatFilter.settings.enabled = checked
        setChatFilterEnabled(checked)
        postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
        break
      case 'chatFilterWords':
        setChatFilterWordsStr(value)
        break

      case 'banCommand':
        data.moderation.commands.ban = checked
        setBanCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'kickCommand':
        data.moderation.commands.kick = checked
        setKickCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'warnCommand':
        data.moderation.commands.warn = checked
        setWarnCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'timeoutCommand':
        data.moderation.commands.timeout = checked
        setTimeoutCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'slowmodeCommand':
        data.moderation.commands.slowmode = checked
        setSlowmodeCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'warningsCommand':
        data.moderation.commands.warnings = checked
        setWarningsCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'clearwarnsCommand':
        data.moderation.commands.clearwarns = checked
        setClearwarnsCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break
      case 'clearCommand':
        data.moderation.commands.clear = checked
        setClearCommand(checked)
        postModuleSettings(guildId, 'moderation', data.moderation, Store)
        break

      default:
        break
    }
  }

  const handleModeratorRoleSelectChange = (value: any) => {
    data.moderation.settings.moderatorRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'moderation', data.moderation, Store)
  }

  const handleChatFilterRolesBypassSave = (value: any) => {
    data.chatFilter.settings.bypassRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }

  const handleChatFilterChannelsBypassSave = (value: any) => {
    data.chatFilter.settings.bypassChannels = value.map((channel: any) => channel.value)
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }

  const handleChatFilterUsersBypassSave = (value: any) => {
    data.chatFilter.settings.bypassUsers = value.map((user: any) => user.value)
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }

  const handleSaveAccountAgeClick = (e: any) => {
    e.preventDefault()
    data.altDetection.settings.accountAge = altDetectionAccountAge
    postModuleSettings(guildId, 'alt-detection', data.altDetection, Store)
  }

  const handleAltDetectionActionSelectChange = (value: any) => {
    data.altDetection.settings.action = value?.value || data.altDetection.settings.action
    postModuleSettings(guildId, 'alt-detection', data.altDetection, Store)
  }

  const handleChatFilterWordsSave = (e: any) => {
    data.chatFilter.settings.words = chatFilterWordsStr !== '' ? chatFilterWordsStr.replaceAll(/\s/g, '').split(',') : []
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }
  const handleChatFilterWordsClear = (e: any) => {
    data.chatFilter.settings.words = []
    setChatFilterWordsStr('')
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }

  const handleChatFilterLogChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.chatFilter.settings.logChannel = newValue
    postModuleSettings(guildId, 'chat-filter', data.chatFilter, Store)
  }

  const handleAltDetectionLogChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.altDetection.settings.logChannel = newValue
    postModuleSettings(guildId, 'alt-detection', data.altDetection, Store)
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Moderation Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Moderation Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={includeReason || data.moderation.settings.includeReason} id="includeReason" name="includeReason" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="includeReason">Show reason on chat on warn/kick/ban/timeout</label>
                </div>
                <label htmlFor="moderatorRoles" className="text-light mt-3">Roles Allowed to use Moderation Module</label>
                <Select
                  defaultValue={roles?.filter(r => data.moderation.settings.moderatorRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="moderatorRoles"
                  id="moderatorRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleModeratorRoleSelectChange}
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
                <label htmlFor="dmOn" className="text-light mt-3">DM Target User:</label>
                <div className="row" id="dmOn">
                  <div className="col-6">
                    <div className="form-check form-switch ps-0 ms-1">
                      <input className="form-check-input ms-auto mt-1" type="checkbox" checked={dmOnBan || data.moderation.settings.dm.ban} id="dmOnBan" name="dmOnBan" onChange={handleChange} />
                      <label className="form-check-label ms-3 text-light" htmlFor="dmOnBan">On Ban</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch ps-0 ms-1">
                      <input className="form-check-input ms-auto mt-1" type="checkbox" checked={dmOnKick || data.moderation.settings.dm.kick} id="dmOnKick" name="dmOnKick" onChange={handleChange} />
                      <label className="form-check-label ms-3 text-light" htmlFor="dmOnKick">On Kick</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch ps-0 ms-1">
                      <input className="form-check-input ms-auto mt-1" type="checkbox" checked={dmOnWarn || data.moderation.settings.dm.warn} id="dmOnWarn" name="dmOnWarn" onChange={handleChange} />
                      <label className="form-check-label ms-3 text-light" htmlFor="dmOnWarn">On Warn</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch ps-0 ms-1">
                      <input className="form-check-input ms-auto mt-1" type="checkbox" checked={dmOnTimeout || data.moderation.settings.dm.timeout} id="dmOnTimeout" name="dmOnTimeout" onChange={handleChange} />
                      <label className="form-check-label ms-3 text-light" htmlFor="dmOnTimeout">On Timeout</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Chat Filter Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={chatFilterEnabled || data.chatFilter.settings.enabled} id="chatFilterEnabled" name="chatFilterEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="chatFilterEnabled">Enable/Disable Module</label>
                </div>

                <label htmlFor="chatFilterLogChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.chatFilter.settings.logChannel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="chatFilterLogChannel"
                  id="chatFilterLogChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleChatFilterLogChannelSelectChange}
                  isClearable
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

                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                  <label className="text-light text-xs" htmlFor="chatFilterWords">
                    Forbidden Words (separated by a comma)
                  </label>
                  <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={chatFilterWordsStr || data.chatFilter.settings.words.join(',')} id="chatFilterWords" name="chatFilterWords" onChange={handleChange} />
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm mt-2 ms-1" onClick={handleChatFilterWordsSave}>Save</button>
                  {
                    chatFilterWordsStr || data.chatFilter.settings.words.lenght > 0 ?
                      <button className="btn btn-danger btn-sm mt-2 ms-1" onClick={handleChatFilterWordsClear}>Clear</button>
                      : null
                  }
                </div>

                <label htmlFor="chatFilterBypassRoles" className="text-light mt-3">Roles Allowed to use Forbidden Words</label>
                <Select
                  defaultValue={roles?.filter(r => data.chatFilter.settings.bypassRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="chatFilterBypassRoles"
                  id="chatFilterBypassRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleChatFilterRolesBypassSave}
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

                <label htmlFor="chatFilterBypassChannels" className="text-light mt-3">Channels Allowed to contain Forbidden Words</label>
                <Select
                  defaultValue={roles?.filter(r => data.chatFilter.settings.bypassChannels.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="chatFilterBypassChannels"
                  id="chatFilterBypassChannels"
                  options={roles?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleChatFilterChannelsBypassSave}
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

                <label htmlFor="chatFilterBypassChannels" className="text-light mt-3">Users Allowed to use Forbidden Words</label>
                <Select
                  defaultValue={users?.filter(u => data.chatFilter.settings.bypassUsers.includes(u.user?.id)).map(u => { return { value: u.user?.id, label: u.nick ? `${u.nick} (${u.user?.username}#${u.user?.discriminator})` : `${u.user?.username}#${u.user?.discriminator}` } })}
                  isMulti
                  name="chatFilterBypassChannels"
                  id="chatFilterBypassChannels"
                  options={users?.map(u => ({ value: u.user?.id, label: u.nick ? `${u.nick} (${u.user?.username}#${u.user?.discriminator})` : `${u.user?.username}#${u.user?.discriminator}` }))}
                  className='channel-role-select text-sm'
                  onChange={handleChatFilterUsersBypassSave}
                  placeholder="Select Users"
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
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Alt Detection Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={altDetectionEnabled || data.altDetection.settings.enabled} id="altDetectionEnabled" name="altDetectionEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="altDetectionEnabled">Enable/Disable Module</label>
                </div>

                <label htmlFor="altDetectionLogChannel" className="text-light mt-3">Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.altDetection.settings.logChannel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="altDetectionLogChannel"
                  id="altDetectionLogChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleAltDetectionLogChannelSelectChange}
                  isClearable
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

                <div className="row">
                  <div className="col-21 col-md-6">
                    <div className="input-group input-group-static ps-0 ms-1 mt-4">
                      <label className="text-light text-xs" htmlFor="altDetectionAccountAge">
                        Minimum Account Age (in days)
                      </label>
                      <input type='number' min={1} className="form-control ms-auto text-white" value={altDetectionAccountAge || data.altDetection.settings.accountAge} id="altDetectionAccountAge" name="altDetectionAccountAge" onChange={handleChange} />
                    </div>
                    <button className="btn btn-primary btn-sm mt-2 ms-1" onClick={handleSaveAccountAgeClick}>Save</button>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="altDetectionAction" className="text-light mt-3">Action to Perform</label>
                    <Select
                      defaultValue={{ value: data.altDetection.settings.action, label: `${data.altDetection.settings.action[0].toUpperCase()}${data.altDetection.settings.action.slice(1)} User` }}
                      name="altDetectionAction"
                      id="altDetectionAction"
                      options={[
                        { value: 'ban', label: 'Ban User' },
                        { value: 'kick', label: 'Kick User' },
                        { value: 'timeout', label: 'Timeout User' },
                      ]}
                      className='channel-role-select text-sm'
                      onChange={handleAltDetectionActionSelectChange}
                      placeholder="Select Action"
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
                </div>
              </div>
              <div className="card card-body dash-card mt-4 p-4">
                <h4 className="text-center">Module Commands</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={banCommand || data.moderation.commands.ban} id="banCommand" name="banCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="banCommand">Ban a member <br /> <code>/ban &lt;target&gt; [reason] [time]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={kickCommand || data.moderation.commands.kick} id="kickCommand" name="kickCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="kickCommand">Kick a member <br /> <code>/kick &lt;target&gt; [reason]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={warnCommand || data.moderation.commands.warn} id="warnCommand" name="warnCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="warnCommand">Warn a member <br /> <code>/warn &lt;target&gt; [reason]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={timeoutCommand || data.moderation.commands.timeout} id="timeoutCommand" name="timeoutCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="timeoutCommand">Timeout a member <br /> <code>/timeout &lt;target&gt; &lt;duration&gt; [reason]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={clearCommand || data.moderation.commands.clear} id="clearCommand" name="clearCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="clearCommand">Delete messages from a channel <br /> <code>/clear &lt;amount&gt; [target]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={warningsCommand || data.moderation.commands.warnings} id="warningsCommand" name="warningsCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="warningsCommand">Check a member's warnings <br /> <code>/warnings &lt;target&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={clearwarnsCommand || data.moderation.commands.clearwarns} id="clearwarnsCommand" name="clearwarnsCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="clearwarnsCommand">Clear a member's warnings <br /> <code>/clearwarns &lt;target&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={slowmodeCommand || data.moderation.commands.slowmode} id="slowmodeCommand" name="slowmodeCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="slowmodeCommand">Set a channel's slowmode <br /> <code>/slowmode &lt;seconds&gt;</code></label>
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