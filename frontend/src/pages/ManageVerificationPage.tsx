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

export const ManageVerificationPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "verification")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { roles, loading: loading3 } = useFetchRoles(guildId)

  const [verificationEnabled, setVerificationEnabled] = useState()
  const [verificationMessage, setVerificationMessage] = useState()
  const [verificationButtonLabel, setVerificationButtonLabel] = useState()
  const [verificationEmbed, setVerificationEmbed] = useState()
  const [verificationEmbedTitle, setVerificationEmbedTitle] = useState()
  const [verificationEmbedTitleUrl, setVerificationEmbedTitleUrl] = useState()
  const [verificationEmbedDescription, setVerificationEmbedDescription] = useState()
  const [verificationEmbedColor, setVerificationEmbedColor] = useState()
  const [verificationEmbedThumbnail, setVerificationEmbedThumbnail] = useState()
  const [verificationEmbedImage, setVerificationEmbedImage] = useState()
  const [verificationEmbedFooterText, setVerificationEmbedFooterText] = useState()
  const [verificationEmbedFooterIcon, setVerificationEmbedFooterIcon] = useState()
  const [verificationEmbedAuthorName, setVerificationEmbedAuthorName] = useState()
  const [verificationEmbedAuthorIcon, setVerificationEmbedAuthorIcon] = useState()
  const [verificationEmbedAuthorUrl, setVerificationEmbedAuthorUrl] = useState()
  const [verificationEmbedTimestamp, setVerificationEmbedTimestamp] = useState()
  const [verifyCommand, setVerificationCommand] = useState()

  if (loading || loading2 || loading3 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case "verificationEnabled":
        data.settings.enabled = checked
        setVerificationEnabled(checked)
        postModuleSettings(guildId, 'verification', data, Store)
        break

      case 'verificationButtonLabel':
        data.settings.buttonLabel = value
        setVerificationButtonLabel(value)
        break

      case 'verificationMessage':
        data.settings.message = value
        setVerificationMessage(value)
        break

      case 'verificationEmbed':
        data.settings.embed.enabled = checked
        setVerificationEmbed(checked)
        postModuleSettings(guildId, 'verification', data, Store)
        break
      case 'verificationEmbedTitle':
        data.settings.embed.title = value
        setVerificationEmbedTitle(value)
        break
      case 'verificationEmbedTitleUrl':
        data.settings.embed.titleUrl = value
        setVerificationEmbedTitleUrl(value)
        break
      case 'verificationEmbedDescription':
        data.settings.embed.description = value
        setVerificationEmbedDescription(value)
        break
      case 'verificationEmbedColor':
        data.settings.embed.color = value
        setVerificationEmbedColor(value)
        break
      case 'verificationEmbedThumbnail':
        data.settings.embed.thumbnail = value
        setVerificationEmbedThumbnail(value)
        break
      case 'verificationEmbedImage':
        data.settings.embed.image = value
        setVerificationEmbedImage(value)
        break
      case 'verificationEmbedFooterText':
        data.settings.embed.footer.text = value
        setVerificationEmbedFooterText(value)
        break
      case 'verificationEmbedFooterIcon':
        data.settings.embed.footer.icon = value
        setVerificationEmbedFooterIcon(value)
        break
      case 'verificationEmbedAuthorName':
        data.settings.embed.author.name = value
        setVerificationEmbedAuthorName(value)
        break
      case 'verificationEmbedAuthorIcon':
        data.settings.embed.author.icon = value
        setVerificationEmbedAuthorIcon(value)
        break
      case 'verificationEmbedAuthorUrl':
        data.settings.embed.author.url = value
        setVerificationEmbedAuthorUrl(value)
        break
      case 'verificationEmbedTimestamp':
        data.settings.embed.timestamp = checked
        setVerificationEmbedTimestamp(checked)
        break
      
      case 'verifyCommand':
        data.settings.command.verify = checked
        setVerificationCommand(checked)
        postModuleSettings(guildId, 'verification', data, Store)
        break

      default:
        break
    }
  }

  const handleVerificationChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.settings.channel = newValue
    postModuleSettings(guildId, 'verification', data, Store)
  }

  const handleSaveVerification = (e: any) => {
    e.preventDefault()
    data.settings.sendPanel = true
    postModuleSettings(guildId, 'verification', data, Store)
  }

  const handleVerificationRolesAddSelectChange = (value: any) => {
    data.settings.rolesToAdd = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'verification', data, Store)
  }

  const handleVerificationRolesRemoveSelectChange = (value: any) => {
    data.settings.rolesToRemove = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'verification', data, Store)
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Verification Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">General Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={verificationEnabled || data.settings.enabled} id="verificationEnabled" name="verificationEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="verificationEnabled">Enable/Disable Module</label>
                </div>
                <label htmlFor="verificationChannel" className="text-light mt-3">Panel Message Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.channel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="verificationChannel"
                  id="verificationChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleVerificationChannelSelectChange}
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
              </div>
              <div className="card card-body dash-card mt-4 p-4">
                <h4 className="text-center">Roles Settings</h4>
                <label htmlFor="verificationRolesToAdd" className="text-light mt-3">Roles to be <b>added</b> to verified users</label>
                <Select
                  defaultValue={roles?.filter(r => data.settings.rolesToAdd.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="verificationRolesToAdd"
                  id="verificationRolesToAdd"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleVerificationRolesAddSelectChange}
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
                <label htmlFor="verificationRolesToAdd" className="text-light mt-3">Roles to be <b>removed</b> from verified users</label>
                <Select
                  defaultValue={roles?.filter(r => data.settings.rolesToRemove.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="verificationRolesToRemove"
                  id="verificationRolesToRemove"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleVerificationRolesRemoveSelectChange}
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
              <div className="card card-body dash-card mt-4 p-4">
                <h4 className="text-center">Commands</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={verifyCommand || data.commands.verify} id="verifyCommand" name="verifyCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="verifyCommand">Verify yourself or a user <br /> <code>/verify [user]</code></label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Panel Message</h4>
                <div className="form-check form-switch ps-0 ms-1 mt-3">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={verificationEmbed || data.settings.embed.enabled} id="verificationEmbed" name="verificationEmbed" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="verificationEmbed">Send embed message</label>
                </div>
                <div id="verificationMessageGroup" className={verificationEmbed ? 'd-none' : data.settings.embed.enabled ? 'd-none' : ''}>
                  <div className="input-group input-group-static ps-0 ms-1 mt-1">
                    <label className="text-light text-xs" htmlFor="verificationMessage">
                      The panel message:
                    </label>
                    <textarea className="form-control ms-auto text-white" value={verificationMessage || data.settings.message} id="verificationMessage" name="verificationMessage" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>
                  <button className="btn btn-primary btn-sm mt-2" onClick={handleSaveVerification}>Send</button>
                </div>
                <div className={verificationEmbed ? "ps-0 ms-1 mt-1" : data.settings.embed.enabled ? "ps-0 ms-1 mt-1" : "ps-0 ms-1 mt-1 d-none"} id="verificationEmbedGroup">
                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="verificationEmbedAuthorName">
                      Embed Author Name
                    </label>
                    <input maxLength={256} type='text' className="form-control ms-auto text-white" value={verificationEmbedAuthorName || data.settings.embed.author.name} id="verificationEmbedAuthorName" name="verificationEmbedAuthorName" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="verificationEmbedAuthorUrl">
                      Embed Author Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedAuthorUrl || data.settings.embed.author.url} id="verificationEmbedAuthorUrl" name="verificationEmbedAuthorUrl" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="verificationEmbedAuthorIcon">
                      Embed Author Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedAuthorIcon || data.settings.embed.author.icon_url} id="verificationEmbedAuthorIcon" name="verificationEmbedAuthorIcon" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="verificationEmbedTitle">
                      Embed Title
                    </label>
                    <input type='text' maxLength={256} className="form-control ms-auto text-white" value={verificationEmbedTitle || data.settings.embed.title} id="verificationEmbedTitle" name="verificationEmbedTitle" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="verificationEmbedTitleUrl">
                      Embed Title Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedTitleUrl || data.settings.embed.titleUrl} id="verificationEmbedTitleUrl" name="verificationEmbedTitleUrl" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="verificationEmbedDescription">
                      Embed Description
                    </label>
                    <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={verificationEmbedDescription || data.settings.embed.description} id="verificationEmbedDescription" name="verificationEmbedDescription" onChange={handleChange} />
                  </div>
                  <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                    <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                    <span>Learn about the <span className="text-white">placeholders</span></span>
                    <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                  </a>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="verificationEmbedThumbnail">
                      Embed Thumbnail Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedThumbnail || data.settings.embed.thumbnail} id="verificationEmbedThumbnail" name="verificationEmbedThumbnail" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="verificationEmbedImage">
                      Embed Image Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedImage || data.settings.embed.image} id="verificationEmbedImage" name="verificationEmbedImage" onChange={handleChange} />
                  </div>

                  <div className="input-group input-group-static ps-0 ms-1 mt-4">
                    <label className="text-light text-xs" htmlFor="verificationEmbedFooterText">
                      Embed Footer Name
                    </label>
                    <input maxLength={2048} type='text' className="form-control ms-auto text-white" value={verificationEmbedFooterText || data.settings.embed.author.name} id="verificationEmbedFooterText" name="verificationEmbedFooterText" onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-static ps-0 ms-1 mt-3">
                    <label className="text-light text-xs" htmlFor="verificationEmbedFooterIcon">
                      Embed Footer Icon Url
                    </label>
                    <input type='url' className="form-control ms-auto text-white" value={verificationEmbedFooterIcon || data.settings.embed.author.icon_url} id="verificationEmbedFooterIcon" name="verificationEmbedFooterIcon" onChange={handleChange} />
                  </div>

                  <div className="row d-flex align-items-center mt-4">
                    <div className="col-4">
                      <div className="input-group input-group-static ps-0 ms-1">
                        <label className="text-light text-xs" htmlFor="verificationEmbedColor">
                          Embed Colour
                        </label>
                        <input type='color' className="form-control ms-auto text-white cursor-pointer" value={verificationEmbedColor || data.settings.embed.color} id="verificationEmbedColor" name="verificationEmbedColor" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="input-group input-group-static ps-0 ms-1">
                        <div className="form-check form-switch ps-0 ms-1">
                          <input className="form-check-input ms-auto mt-1" type="checkbox" checked={verificationEmbedTimestamp || data.settings.embed.timestamp} id="verificationEmbedTimestamp" name="verificationEmbedTimestamp" onChange={handleChange} />
                          <label className="form-check-label ms-3 text-light" htmlFor="verificationEmbedTimestamp">Show Timestamp in Embed</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm mt-4" onClick={handleSaveVerification}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}