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

export const ManageWelcomePage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "welcome")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { roles, loading: loading3 } = useFetchRoles(guildId)

  const [welcomeEnabled, setWelcomeEnabled] = useState()
  const [welcomeDM, setWelcomeDM] = useState()
  const [welcomeMessage, setWelcomeMessage] = useState()
  const [welcomeEmbed, setWelcomeEmbed] = useState()
  const [welcomeEmbedTitle, setWelcomeEmbedTitle] = useState()
  const [welcomeEmbedTitleUrl, setWelcomeEmbedTitleUrl] = useState()
  const [welcomeEmbedDescription, setWelcomeEmbedDescription] = useState()
  const [welcomeEmbedColor, setWelcomeEmbedColor] = useState()
  const [welcomeEmbedThumbnail, setWelcomeEmbedThumbnail] = useState()
  const [welcomeEmbedImage, setWelcomeEmbedImage] = useState()
  const [welcomeEmbedFooterText, setWelcomeEmbedFooterText] = useState()
  const [welcomeEmbedFooterIcon, setWelcomeEmbedFooterIcon] = useState()
  const [welcomeEmbedAuthorName, setWelcomeEmbedAuthorName] = useState()
  const [welcomeEmbedAuthorIcon, setWelcomeEmbedAuthorIcon] = useState()
  const [welcomeEmbedAuthorUrl, setWelcomeEmbedAuthorUrl] = useState()

  const [leaveEnabled, setLeaveEnabled] = useState()
  const [leaveDM, setLeaveDM] = useState()
  const [leaveMessage, setLeaveMessage] = useState()
  const [leaveEmbed, setLeaveEmbed] = useState()
  const [leaveEmbedTitle, setLeaveEmbedTitle] = useState()
  const [leaveEmbedTitleUrl, setLeaveEmbedTitleUrl] = useState()
  const [leaveEmbedDescription, setLeaveEmbedDescription] = useState()
  const [leaveEmbedColor, setLeaveEmbedColor] = useState()
  const [leaveEmbedThumbnail, setLeaveEmbedThumbnail] = useState()
  const [leaveEmbedImage, setLeaveEmbedImage] = useState()
  const [leaveEmbedFooterText, setLeaveEmbedFooterText] = useState()
  const [leaveEmbedFooterIcon, setLeaveEmbedFooterIcon] = useState()
  const [leaveEmbedAuthorName, setLeaveEmbedAuthorName] = useState()
  const [leaveEmbedAuthorIcon, setLeaveEmbedAuthorIcon] = useState()
  const [leaveEmbedAuthorUrl, setLeaveEmbedAuthorUrl] = useState()

  const [autorolesEnabled, setAutorolesEnabled] = useState()

  if (loading || loading2 || loading3 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case 'welcomeEnabled':
        data.welcome.settings.enabled = checked
        setWelcomeEnabled(checked)
        postModuleSettings(guildId, 'welcome', data.welcome, Store)
        break
      case 'welcomeDM':
        data.welcome.settings.dm = checked
        setWelcomeDM(checked)
        postModuleSettings(guildId, 'welcome', data.welcome, Store)
        break
      case 'welcomeMessage':
        data.welcome.settings.message = value
        setWelcomeMessage(value)
        break
      case 'welcomeEmbed':
        data.welcome.settings.embed.enabled = checked
        setWelcomeEmbed(checked)
        postModuleSettings(guildId, 'welcome', data.welcome, Store)
        break
      case 'welcomeEmbedTitle':
        data.welcome.settings.embed.title = value
        setWelcomeEmbedTitle(value)
        break
      case 'welcomeEmbedTitleUrl':
        data.welcome.settings.embed.titleUrl = value
        setWelcomeEmbedTitleUrl(value)
        break
      case 'welcomeEmbedDescription':
        data.welcome.settings.embed.description = value
        setWelcomeEmbedDescription(value)
        break
      case 'welcomeEmbedColor':
        data.welcome.settings.embed.color = value
        setWelcomeEmbedColor(value)
        break
      case 'welcomeEmbedThumbnail':
        data.welcome.settings.embed.thumbnail = value
        setWelcomeEmbedThumbnail(value)
        break
      case 'welcomeEmbedImage':
        data.welcome.settings.embed.image = value
        setWelcomeEmbedImage(value)
        break
      case 'welcomeEmbedFooterText':
        data.welcome.settings.embed.footer.text = value
        setWelcomeEmbedFooterText(value)
        break
      case 'welcomeEmbedFooterIcon':
        data.welcome.settings.embed.footer.icon = value
        setWelcomeEmbedFooterIcon(value)
        break
      case 'welcomeEmbedAuthorName':
        data.welcome.settings.embed.author.name = value
        setWelcomeEmbedAuthorName(value)
        break
      case 'welcomeEmbedAuthorIcon':
        data.welcome.settings.embed.author.icon = value
        setWelcomeEmbedAuthorIcon(value)
        break
      case 'welcomeEmbedAuthorUrl':
        data.welcome.settings.embed.author.url = value
        setWelcomeEmbedAuthorUrl(value)
        break

      case 'leaveEnabled':
        data.leave.settings.enabled = checked
        setLeaveEnabled(checked)
        postModuleSettings(guildId, 'leave', data.leave, Store)
        break
      case 'leaveDM':
        data.leave.settings.dm = checked
        setLeaveDM(checked)
        postModuleSettings(guildId, 'leave', data.leave, Store)
        break
      case 'leaveMessage':
        data.leave.settings.message = value
        setLeaveMessage(value)
        break
      case 'leaveEmbed':
        data.leave.settings.embed.enabled = checked
        setLeaveEmbed(checked)
        postModuleSettings(guildId, 'leave', data.leave, Store)
        break
      case 'leaveEmbedTitle':
        data.leave.settings.embed.title = value
        setLeaveEmbedTitle(value)
        break
      case 'leaveEmbedTitleUrl':
        data.leave.settings.embed.titleUrl = value
        setLeaveEmbedTitleUrl(value)
        break
      case 'leaveEmbedDescription':
        data.leave.settings.embed.description = value
        setLeaveEmbedDescription(value)
        break
      case 'leaveEmbedColor':
        data.leave.settings.embed.color = value
        setLeaveEmbedColor(value)
        break
      case 'leaveEmbedThumbnail':
        data.leave.settings.embed.thumbnail = value
        setLeaveEmbedThumbnail(value)
        break
      case 'leaveEmbedImage':
        data.leave.settings.embed.image = value
        setLeaveEmbedImage(value)
        break
      case 'leaveEmbedFooterText':
        data.leave.settings.embed.footer.text = value
        setLeaveEmbedFooterText(value)
        break
      case 'leaveEmbedFooterIcon':
        data.leave.settings.embed.footer.icon = value
        setLeaveEmbedFooterIcon(value)
        break
      case 'leaveEmbedAuthorName':
        data.leave.settings.embed.author.name = value
        setLeaveEmbedAuthorName(value)
        break
      case 'leaveEmbedAuthorIcon':
        data.leave.settings.embed.author.icon = value
        setLeaveEmbedAuthorIcon(value)
        break
      case 'leaveEmbedAuthorUrl':
        data.leave.settings.embed.author.url = value
        setLeaveEmbedAuthorUrl(value)
        break

      case 'autorolesEnabled':
        data.autoroles.settings.enabled = checked
        setAutorolesEnabled(checked)
        postModuleSettings(guildId, 'autoroles', data.autoroles, Store)
        break

      default:
        break
    }
  }

  const handleWelcomeChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.welcome.settings.channel = newValue
    postModuleSettings(guildId, 'welcome', data.welcome, Store)
  }

  const handleSaveWelcome = (e: any) => {
    e.preventDefault()
    postModuleSettings(guildId, 'welcome', data.welcome, Store)
  }

  const handleLeaveChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.leave.settings.channel = newValue
    postModuleSettings(guildId, 'leave', data.leave, Store)
  }

  const handleSaveLeave = (e: any) => {
    e.preventDefault()
    postModuleSettings(guildId, 'leave', data.leave, Store)
  }

  const handleUserRolesSelectChange = (value: any) => {
    data.autoroles.settings.userRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'autoroles', data.autoroles, Store)
  }
  const handleBotRolesSelectChange = (value: any) => {
    data.autoroles.settings.botRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'autoroles', data.autoroles, Store)
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Welcome, Leave & Autoroles Modules</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Welcome Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={welcomeEnabled || data.welcome.settings.enabled} id="welcomeEnabled" name="welcomeEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="welcomeEnabled">Enable/Disable Module</label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={welcomeDM || data.welcome.settings.dm} id="welcomeDM" name="welcomeDM" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="welcomeDM">Send the message via DM on join</label>
                </div>
                <label htmlFor="welcomeChannel" className="text-light mt-3">Welcome Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.welcome.settings.channel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="welcomeChannel"
                  id="welcomeChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleWelcomeChannelSelectChange}
                  placeholder="Select Channel"
                  isClearable
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

                <div className="form-check form-switch ps-0 ms-1 mt-4">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={welcomeEmbed || data.welcome.settings.embed.enabled} id="welcomeEmbed" name="welcomeEmbed" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="welcomeEmbed">Send embed message</label>
                </div>
                <div id="welcomeMessageGroup" className={welcomeEmbed ? 'd-none' : data.welcome.settings.embed.enabled ? 'd-none' : ''}>
                  <div className="input-group input-group-static ps-0 ms-1 mt-1">
                    <label className="text-light text-xs" htmlFor="welcomeMessage">
                      The message to be sent:
                    </label>
                    <textarea className="form-control ms-auto text-white" value={welcomeMessage || data.welcome.settings.message} id="welcomeMessage" name="welcomeMessage" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>
                  <button className="btn btn-primary btn-sm mt-2" onClick={handleSaveWelcome}>Save</button>
                </div>
                <div className={welcomeEmbed ? "ps-0 ms-1 mt-1" : data.welcome.settings.embed.enabled ? "ps-0 ms-1 mt-1" : "ps-0 ms-1 mt-1 d-none"} id="welcomeEmbedGroup">
                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedAuthorName">
                      Embed Author Name
                    </label>
                    <input maxLength={256} type='text' className="form-control ms-auto text-white" value={welcomeEmbedAuthorName || data.welcome.settings.embed.author.name} id="welcomeEmbedAuthorName" name="welcomeEmbedAuthorName" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedAuthorUrl">
                      Embed Author Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedAuthorUrl || data.welcome.settings.embed.author.url} id="welcomeEmbedAuthorUrl" name="welcomeEmbedAuthorUrl" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedAuthorIcon">
                      Embed Author Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedAuthorIcon || data.welcome.settings.embed.author.icon_url} id="welcomeEmbedAuthorIcon" name="welcomeEmbedAuthorIcon" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedTitle">
                      Embed Title
                    </label>
                    <input type='text' maxLength={256} className="form-control ms-auto text-white" value={welcomeEmbedTitle || data.welcome.settings.embed.title} id="welcomeEmbedTitle" name="welcomeEmbedTitle" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedTitleUrl">
                      Embed Title Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedTitleUrl || data.welcome.settings.embed.titleUrl} id="welcomeEmbedTitleUrl" name="welcomeEmbedTitleUrl" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedDescription">
                      Embed Description
                    </label>
                    <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={welcomeEmbedDescription || data.welcome.settings.embed.description} id="welcomeEmbedDescription" name="welcomeEmbedDescription" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedThumbnail">
                      Embed Thumbnail Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedThumbnail || data.welcome.settings.embed.thumbnail} id="welcomeEmbedThumbnail" name="welcomeEmbedThumbnail" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedImage">
                      Embed Image Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedImage || data.welcome.settings.embed.image} id="welcomeEmbedImage" name="welcomeEmbedImage" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedFooterText">
                      Embed Footer Name
                    </label>
                    <input maxLength={2048} type='text' className="form-control ms-auto text-white" value={welcomeEmbedFooterText || data.welcome.settings.embed.author.name} id="welcomeEmbedFooterText" name="welcomeEmbedFooterText" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="welcomeEmbedFooterIcon">
                      Embed Footer Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={welcomeEmbedFooterIcon || data.welcome.settings.embed.author.icon_url} id="welcomeEmbedFooterIcon" name="welcomeEmbedFooterIcon" onChange={handleChange} />
                  </div>

                  <div className="row d-flex align-items-center mt-4">
                    <div className="col-4">
                      <div className="input-group input-group-static ps-0 ms-1">
                        <label className="text-light text-xs" htmlFor="welcomeEmbedColor">
                          Embed Colour
                        </label>
                        <input type='color' className="form-control ms-auto text-white cursor-pointer" value={welcomeEmbedColor || data.welcome.settings.embed.color} id="welcomeEmbedColor" name="welcomeEmbedColor" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-8"></div>
                  </div>
                  <button className="btn btn-primary btn-sm mt-4" onClick={handleSaveWelcome}>Save</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Leave Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={leaveEnabled || data.leave.settings.enabled} id="leaveEnabled" name="leaveEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="leaveEnabled">Enable/Disable Module</label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={leaveDM || data.leave.settings.dm} id="leaveDM" name="leaveDM" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="leaveDM">Send the message via DM on join</label>
                </div>
                <label htmlFor="leaveChannel" className="text-light mt-3">Leave Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.leave.settings.channel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="leaveChannel"
                  id="leaveChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleLeaveChannelSelectChange}
                  placeholder="Select Channel"
                  isClearable
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

                <div className="form-check form-switch ps-0 ms-1 mt-4">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={leaveEmbed || data.leave.settings.embed.enabled} id="leaveEmbed" name="leaveEmbed" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="leaveEmbed">Send embed message</label>
                </div>
                <div id="leaveMessageGroup" className={leaveEmbed ? 'd-none' : data.leave.settings.embed.enabled ? 'd-none' : ''}>
                  <div className="input-group input-group-static ps-0 ms-1 mt-1">
                    <label className="text-light text-xs" htmlFor="leaveMessage">
                      The message to be sent:
                    </label>
                    <textarea className="form-control ms-auto text-white" value={leaveMessage || data.leave.settings.message} id="leaveMessage" name="leaveMessage" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>
                  <button className="btn btn-primary btn-sm mt-2" onClick={handleSaveLeave}>Save</button>
                </div>
                <div className={leaveEmbed ? "ps-0 ms-1 mt-1" : data.leave.settings.embed.enabled ? "ps-0 ms-1 mt-1" : "ps-0 ms-1 mt-1 d-none"} id="leaveEmbedGroup">
                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="leaveEmbedAuthorName">
                      Embed Author Name
                    </label>
                    <input maxLength={256} type='text' className="form-control ms-auto text-white" value={leaveEmbedAuthorName || data.leave.settings.embed.author.name} id="leaveEmbedAuthorName" name="leaveEmbedAuthorName" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="leaveEmbedAuthorUrl">
                      Embed Author Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedAuthorUrl || data.leave.settings.embed.author.url} id="leaveEmbedAuthorUrl" name="leaveEmbedAuthorUrl" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="leaveEmbedAuthorIcon">
                      Embed Author Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedAuthorIcon || data.leave.settings.embed.author.icon_url} id="leaveEmbedAuthorIcon" name="leaveEmbedAuthorIcon" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="leaveEmbedTitle">
                      Embed Title
                    </label>
                    <input type='text' maxLength={256} className="form-control ms-auto text-white" value={leaveEmbedTitle || data.leave.settings.embed.title} id="leaveEmbedTitle" name="leaveEmbedTitle" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="leaveEmbedTitleUrl">
                      Embed Title Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedTitleUrl || data.leave.settings.embed.titleUrl} id="leaveEmbedTitleUrl" name="leaveEmbedTitleUrl" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="leaveEmbedDescription">
                      Embed Description
                    </label>
                    <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={leaveEmbedDescription || data.leave.settings.embed.description} id="leaveEmbedDescription" name="leaveEmbedDescription" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="leaveEmbedThumbnail">
                      Embed Thumbnail Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedThumbnail || data.leave.settings.embed.thumbnail} id="leaveEmbedThumbnail" name="leaveEmbedThumbnail" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="leaveEmbedImage">
                      Embed Image Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedImage || data.leave.settings.embed.image} id="leaveEmbedImage" name="leaveEmbedImage" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="leaveEmbedFooterText">
                      Embed Footer Name
                    </label>
                    <input maxLength={2048} type='text' className="form-control ms-auto text-white" value={leaveEmbedFooterText || data.leave.settings.embed.author.name} id="leaveEmbedFooterText" name="leaveEmbedFooterText" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="leaveEmbedFooterIcon">
                      Embed Footer Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={leaveEmbedFooterIcon || data.leave.settings.embed.author.icon_url} id="leaveEmbedFooterIcon" name="leaveEmbedFooterIcon" onChange={handleChange} />
                  </div>

                  <div className="row d-flex align-items-center mt-4">
                    <div className="col-4">
                      <div className="input-group input-group-static ps-0 ms-1">
                        <label className="text-light text-xs" htmlFor="leaveEmbedColor">
                          Embed Colour
                        </label>
                        <input type='color' className="form-control ms-auto text-white cursor-pointer" value={leaveEmbedColor || data.leave.settings.embed.color} id="leaveEmbedColor" name="leaveEmbedColor" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-8">
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm mt-4" onClick={handleSaveLeave}>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="card card-body dash-card p-4">

                <h4 className="text-center">Autoroles Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={autorolesEnabled || data.autoroles.settings.enabled} id="autorolesEnabled" name="autorolesEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="autorolesEnabled">Enable/Disable Module</label>
                </div>

                <label htmlFor="autorolesUserRoles" className="text-light mt-3">Roles to be given to new <b>user</b> members</label>
                <Select
                  defaultValue={roles?.filter(r => data.autoroles.settings.userRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="autorolesUserRoles"
                  id="autorolesUserRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleUserRolesSelectChange}
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

                <label htmlFor="autorolesBotRoles" className="text-light mt-3">Roles to be given to new <b>bot</b> members</label>
                <Select
                  defaultValue={roles?.filter(r => data.autoroles.settings.botRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="autorolesBotRoles"
                  id="autorolesBotRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleBotRolesSelectChange}
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
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </div >
  )
}