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
import { useFetchRoles } from "../utils/hooks/useFetchRoles"

export const ManageAdministrationPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "administration")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { roles, loading: loading3 } = useFetchRoles(guildId)

  const [chatbotEnabled, setChatbotEnabled] = useState()
  const [chatbotCommand, setChatbotCommand] = useState()
  const [autoreactCommand, setAutoreactCommand] = useState()
  const [giveawayStartCommand, setGiveawayStartCommand] = useState()
  const [giveawayEndCommand, setGiveawayEndCommand] = useState()
  const [giveawayPauseCommand, setGiveawayPauseCommand] = useState()
  const [giveawayUnpauseCommand, setGiveawayUnpauseCommand] = useState()
  const [giveawayRerollCommand, setGiveawayRerollCommand] = useState()
  const [giveawayDeleteCommand, setGiveawayDeleteCommand] = useState()
  const [autoreactObjArray, setAutoreactObjArray] = useState([])
  const [emojiStr, setEmojiStr] = useState('')
  const [channelStr, setChannelStr] = useState('')

  if (loading || loading2 || loading3 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case 'chatbotEnabled':
        data.settings.chatbot.enabled = checked
        setChatbotEnabled(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break

      case 'chatbotCommand':
        data.commands.chatbot = checked
        setChatbotCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'autoreactCommand':
        data.commands.autoreact = checked
        setAutoreactCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayStartCommand':
        data.commands.giveaway.start = checked
        setGiveawayStartCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayEndCommand':
        data.commands.giveaway.end = checked
        setGiveawayEndCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayPauseCommand':
        data.commands.giveaway.pause = checked
        setGiveawayPauseCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayUnpauseCommand':
        data.commands.giveaway.unpause = checked
        setGiveawayUnpauseCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayRerollCommand':
        data.commands.giveaway.reroll = checked
        setGiveawayRerollCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break
      case 'giveawayDeleteCommand':
        data.commands.giveaway.delete = checked
        setGiveawayDeleteCommand(checked)
        postModuleSettings(guildId, 'administration', data, Store)
        break

      case 'autoreactObjEmojis':
        setEmojiStr(value)
        break

      default:
        break
    }
  }

  const handleChannelSelectChange = (value: any) => {
    data.settings.chatbot.channels = value.map((channel: any) => channel.value)
    postModuleSettings(guildId, 'administration', data, Store)
  }
  const handleRoleSelectChange = (value: any) => {
    data.settings.staffRoles = value.map((role: any) => role.value)
    postModuleSettings(guildId, 'administration', data, Store)
  }

  const handleAutoreactChannelSelectChange = (value: any) => {
    setChannelStr(value.value)
  }

  const handleDeleteAutoreactObj = (e: any) => {
    e.preventDefault()
    const { id } = e.target
    let obj = data.settings.autoreact.filter((obj: any) => obj.channel === id)[0]
    data.settings.autoreact.splice(data.settings.autoreact.indexOf(obj), 1)
    setAutoreactObjArray(data.settings.autoreact)
    postModuleSettings(guildId, 'administration', data, Store)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleEditAutoreactObj = (e: any) => {
    let obj = data.settings.autoreact.filter((obj: any) => obj.channel === e.target.name)[0]
    let index = data.settings.autoreact.indexOf(obj)
    let newObj = obj

    newObj.emojis = emojiStr !== '' ? emojiStr.replaceAll(/\s/g, '').split(',') : data.settings.autoreact[index].emojis
    data.settings.autoreact[index] = newObj
    setAutoreactObjArray(data.settings.autoreact)
    postModuleSettings(guildId, 'administration', data, Store)
    setEmojiStr('')
  }

  const handleAddAutoreactObj = (e: any) => {
    if (!emojiStr || !channelStr) return Store.addNotification({
      title: 'Error',
      message: 'Please fill out all fields',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
    })
    let newObj = {
      emojis: emojiStr !== '' ? emojiStr.replaceAll(/\s/g, '').split(',') : [],
      channel: channelStr
    }

    data.settings.autoreact.push(newObj)
    setAutoreactObjArray(data.settings.autoreact)
    postModuleSettings(guildId, 'administration', data, Store)
    setEmojiStr('')
    setChannelStr('')
  }

  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Administration Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Chatbot Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={chatbotEnabled || data.settings.chatbot.enabled} id="chatbotEnabled" name="chatbotEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="chatbotEnabled">Enable/Disable Module</label>
                </div>
                <label htmlFor="chatbotChannels" className="text-light mt-3">Chatbot Allowed Channels</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.chatbot.channels.includes(c.id)).map(c => { return { value: c.id, label: '#' + c.name } })}
                  isMulti
                  name="chatbotChannels"
                  id="chatbotChannels"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleChannelSelectChange}
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
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Autoreact Settings</h4>
                {
                  autoreactObjArray.length > 0 ?
                    autoreactObjArray.map((autoreactObj: { channel: string; emojis: string[] }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + autoreactObj.channel} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Autoreact Channel #{index + 1}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Channel</label>
                                  <input className="form-control text-light" disabled value={"#" + channels?.filter((c: PartialChannel) => c.id === autoreactObj.channel)[0]?.name} />
                                </div>
                                <div className="input-group input-group-static mt-3">
                                  <label className="text-light">
                                    Emojis
                                    <Tooltip arrow placement='right' title="Only unicode emojis or server-custom emojis (<:emoji_name:emoji_id>) are allowed. Separated by a comma.">
                                      <span className="cursor-pointer ms-2 text-xs text-white material-icons-round opacity-6">help_outline</span>
                                    </Tooltip>
                                  </label>
                                  <input type="text" className="form-control text-light" name="autoreactObjEmojis" onChange={handleChange} value={emojiStr || autoreactObj.emojis.join(',')} />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditAutoreactObj} name={autoreactObj.channel}>Save changes</button>
                                <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) :
                    data.settings.autoreact.map((autoreactObj: { channel: string; emojis: string[] }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + autoreactObj.channel} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Autoreact Channel #{index + 1}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Channel</label>
                                  <input className="form-control text-light" disabled value={"#" + channels?.filter((c: PartialChannel) => c.id === autoreactObj.channel)[0]?.name} />
                                </div>
                                <div className="input-group input-group-static mt-3">
                                  <label className="text-light">
                                    Emojis
                                    <Tooltip arrow placement='right' title="Only unicode emojis or server-custom emojis (<:emoji_name:emoji_id>) are allowed. Separated by a comma.">
                                      <span className="cursor-pointer ms-2 text-xs text-white material-icons-round opacity-6">help_outline</span>
                                    </Tooltip>
                                  </label>
                                  <input type="text" className="form-control text-light" name="autoreactObjEmojis" onChange={handleChange} value={emojiStr || autoreactObj.emojis.join(',')} />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditAutoreactObj} name={autoreactObj.channel}>Save changes</button>
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
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Channel</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">
                          <span>Emojis</span>
                          <Tooltip arrow placement='top' title="Only unicode emojis or server-custom emojis (<:emoji_name:emoji_id>) are allowed. Separated by a comma.">
                            <span className="cursor-pointer ms-2 text-xs text-white material-icons-round opacity-6">help_outline</span>
                          </Tooltip>
                        </th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        autoreactObjArray.length > 0 ?
                          autoreactObjArray.map((autoreactObj: { channel: string; emojis: string[] }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">#{channels?.filter((c: PartialChannel) => c.id === autoreactObj.channel)[0]?.name}</td>
                                <td className='text-sm text-light'>{autoreactObj.emojis.join(',')}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + autoreactObj.channel}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={autoreactObj.channel} onClick={handleDeleteAutoreactObj} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
                                  </Tooltip>
                                </td>
                              </tr>
                            )
                          }) :
                          data.settings.autoreact.map((autoreactObj: { channel: string; emojis: string[] }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">#{channels?.filter((c: PartialChannel) => c.id === autoreactObj.channel)[0]?.name}</td>
                                <td className='text-sm text-light'>{autoreactObj.emojis.join(',')}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + autoreactObj.channel}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={autoreactObj.channel} onClick={handleDeleteAutoreactObj} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
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
                        <h6 className="modal-title" id="modal-title-default">Add Autoreact Channel</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="modal-body text-light">
                        <div>
                          <label htmlFor="autoreactObjChannel" className="text-light mt-3">Channel</label>
                          <Select
                            defaultValue={null}
                            name="autoreactObjChannel"
                            id="autoreactObjChannel"
                            options={channels?.filter(c => !data.settings.autoreact.map((obj: any) => obj.channel).includes(c.id)).map(c => ({ value: c.id, label: '#' + c.name }))}
                            className='channel-role-select text-sm text-light'
                            onChange={handleAutoreactChannelSelectChange}
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
                        </div>
                        <div className="input-group input-group-static mt-3">
                          <label className="text-light">
                            Emojis
                            <Tooltip arrow placement='right' title="Only unicode emojis or server-custom emojis (<:emoji_name:emoji_id>) are allowed. Separated by a comma.">
                              <span className="cursor-pointer ms-2 text-xs text-white material-icons-round opacity-6">help_outline</span>
                            </Tooltip>
                          </label>
                          <input type="text" className="form-control text-light" name="autoreactObjEmojis" onChange={handleChange} value={emojiStr} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleAddAutoreactObj} name={channelStr}>Add Channel</button>
                        <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-icon bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" data-bs-toggle="modal" data-bs-target='#modal-create'>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="material-icons ms-2" aria-hidden="true">add</i>
                    Add Autoreact Channel
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Staff Roles</h4>
                <div className="ps-0 ms-1">
                  <small>The roles that are allowed to use staff only commands, such as <code>/giveaway</code>, <code>/verify [user]</code></small>
                </div>
                <label htmlFor="staffRoles" className="text-light mt-3">Staff Roles</label>
                <Select
                  defaultValue={roles?.filter(r => data.settings.staffRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                  isMulti
                  name="staffRoles"
                  id="staffRoles"
                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleRoleSelectChange}
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
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Module Commands</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={chatbotCommand || data.commands.chatbot} id="chatbotCommand" name="chatbotCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="chatbotCommand">Add/Remove chatbot allowed channels <br /> <code>/chatbot channel &lt;add|remove&gt; &lt;channel&gt;</code></label>
                </div>

                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={autoreactCommand || data.commands.autoreact} id="autoreactCommand" name="autoreactCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="autoreactCommand">Add/Remove channels for autoreact module <br /> <code>/autoreact channel &lt;add|remove&gt; &lt;channel&gt; [emojis]</code></label>
                </div>

                <div className="form-check form-switch ps-0 ms-1 mt-2">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayStartCommand || data.commands.giveaway.start} id="giveawayStartCommand" name="giveawayStartCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayStartCommand">Start a giveaway <br /> <code>/giveaway start &lt;time&gt; &lt;winners&gt; &lt;prize&gt; [channel] [hosted_by] [drop]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayEndCommand || data.commands.giveaway.end} id="giveawayEndCommand" name="giveawayEndCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayEndCommand">End a giveaway <br /> <code>/giveaway end &lt;message_id&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayPauseCommand || data.commands.giveaway.pause} id="giveawayPauseCommand" name="giveawayPauseCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayPauseCommand">Pause a giveaway <br /> <code>/giveaway pause &lt;message_id&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayUnpauseCommand || data.commands.giveaway.unpause} id="giveawayUnpauseCommand" name="giveawayUnpauseCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayUnpauseCommand">Unpause a giveaway <br /> <code>/giveaway unpause &lt;message_id&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayRerollCommand || data.commands.giveaway.reroll} id="giveawayRerollCommand" name="giveawayRerollCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayRerollCommand">Reroll a giveaway <br /> <code>/giveaway reroll &lt;message_id&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={giveawayDeleteCommand || data.commands.giveaway.delete} id="giveawayDeleteCommand" name="giveawayDeleteCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="giveawayDeleteCommand">Delete a giveaway <br /> <code>/giveaway delete &lt;message_id&gt;</code></label>
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