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
import { useFetchCategories } from "../utils/hooks/useFetchCategories"
import { useFetchRoles } from "../utils/hooks/useFetchRoles"

export const ManageTicketsPage = ({ user }: { user: User }) => {
  const guildId = localStorage.getItem("guildId") || ""
  const { moduleData: data, loading } = useManageModuleData(guildId, "tickets")
  const { channels, loading: loading2 } = useFetchChannels(guildId)
  const { categories, loading: loading3 } = useFetchCategories(guildId)
  const { roles, loading: loading4 } = useFetchRoles(guildId)

  const [ticketsEnabled, setTicketsEnabled] = useState()
  const [ticketCategoriesArray, setTicketCategoriesArray] = useState([])
  const [ticketsCategoryCategoryStr, setTicketsCategoryCategoryStr] = useState('')
  const [ticketsCategorySupportRoles, setTicketsCategorySupportRoles] = useState([])
  const [ticketsCategoryDeleteOnClose, setTicketsCategoryDeleteOnClose] = useState()
  const [ticketsCategoryMoveToClosedCategory, setTicketsCategoryMoveToClosedCategory] = useState()
  const [ticketsCategoryWelcomeMessageMessage, setTicketsCategoryWelcomeMessageMessage] = useState()
  const [ticketsCategoryWelcomeMessageColor, setTicketsCategoryWelcomeMessageColor] = useState('#000000')
  const [ticketsCategoryMaxTickets, setTicketsCategoryMaxTickets] = useState()
  const [ticketsCategoryLabel, setTicketsCategoryLabel] = useState()

  const [ticketsPanelMessageTitle, setTicketsPanelMessageTitle] = useState()
  const [ticketsPanelMessageTitleUrl, setTicketsPanelMessageTitleUrl] = useState()
  const [ticketsPanelMessageDescription, setTicketsPanelMessageDescription] = useState()
  const [ticketsPanelMessageColor, setTicketsPanelMessageColor] = useState('#000000')
  const [ticketsPanelMessageThumbnail, setTicketsPanelMessageThumbnail] = useState()
  const [ticketsPanelMessageImage, setTicketsPanelMessageImage] = useState()
  const [ticketsPanelMessageTimestamp, setTicketsPanelMessageTimestamp] = useState()
  const [ticketsPanelExists, setTicketsPanelExists] = useState<boolean | undefined>(data?.settings.panelMessage.id ? true : false)

  const [addCommand, setAddCommand] = useState()
  const [removeCommand, setRemoveCommand] = useState()
  const [closeCommand, setCloseCommand] = useState()
  const [transcriptCommand, setTranscriptCommand] = useState()
  const [reopenCommand, setReopenCommand] = useState()
  const [deleteCommand, setDeleteCommand] = useState()
  const [claimCommand, setClaimCommand] = useState()
  const [unclaimCommand, setUnclaimCommand] = useState()
  const [lockCommand, setLockCommand] = useState()
  const [unlockCommand, setUnlockCommand] = useState()

  if (loading || loading2 || loading3 || loading4 || !data) return <Spinner />

  if (!guildId) {
    window.location.replace("/servers")
    return <Spinner />
  }

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    switch (name) {
      case 'ticketsEnabled':
        data.settings.enabled = checked
        setTicketsEnabled(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'ticketsCategoryDeleteOnClose':
        setTicketsCategoryDeleteOnClose(checked)
        break
      case 'ticketsCategoryMoveToClosedCategory':
        setTicketsCategoryMoveToClosedCategory(checked)
        break
      case 'ticketsCategoryWelcomeMessageMessage':
        setTicketsCategoryWelcomeMessageMessage(value)
        break
      case 'ticketsCategoryWelcomeMessageColor':
        setTicketsCategoryWelcomeMessageColor(value)
        break
      case 'ticketsCategoryMaxTickets':
        setTicketsCategoryMaxTickets(value)
        break
      case 'ticketsCategoryLabel':
        setTicketsCategoryLabel(value)
        break

      case 'ticketsPanelMessageTitle':
        setTicketsPanelMessageTitle(value)
        break
      case 'ticketsPanelMessageTitleUrl':
        setTicketsPanelMessageTitleUrl(value)
        break
      case 'ticketsPanelMessageDescription':
        setTicketsPanelMessageDescription(value)
        break
      case 'ticketsPanelMessageColor':
        setTicketsPanelMessageColor(value)
        break
      case 'ticketsPanelMessageThumbnail':
        setTicketsPanelMessageThumbnail(value)
        break
      case 'ticketsPanelMessageImage':
        setTicketsPanelMessageImage(value)
        break
      case 'ticketsPanelMessageTimestamp':
        setTicketsPanelMessageTimestamp(checked)
        break

      case 'addCommand':
        data.commands.add = checked
        setAddCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'removeCommand':
        data.commands.remove = checked
        setRemoveCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'closeCommand':
        data.commands.close = checked
        setCloseCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'transcriptCommand':
        data.commands.transcript = checked
        setTranscriptCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'reopenCommand':
        data.commands.reopen = checked
        setReopenCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'deleteCommand':
        data.commands.delete = checked
        setDeleteCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'claimCommand':
        data.commands.claim = checked
        setClaimCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'unclaimCommand':
        data.commands.unclaim = checked
        setUnclaimCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'lockCommand':
        data.commands.lock = checked
        setLockCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break
      case 'unlockCommand':
        data.commands.unlock = checked
        setUnlockCommand(checked)
        postModuleSettings(guildId, 'tickets', data, Store)
        break

      default:
        break
    }
  }

  const handleLogChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.settings.logChannel = newValue
    postModuleSettings(guildId, 'tickets', data, Store)
  }
  const handleClosedCategorySelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.settings.closedCategory = newValue
    postModuleSettings(guildId, 'tickets', data, Store)
  }

  const handleDeleteTicketCategory = (e: any) => {
    e.preventDefault()
    const { id } = e.target
    let obj = data.settings.categories.filter((obj: any) => obj.label === id)[0]
    data.settings.categories.splice(data.settings.categories.indexOf(obj), 1)
    setTicketCategoriesArray(data.settings.categories)
    postModuleSettings(guildId, 'tickets', data, Store)

    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  const handleEditTicketCategory = (e: any) => {
    let obj = data.settings.categories.filter((obj: any) => obj.label === e.target.name)[0]
    let index = data.settings.categories.indexOf(obj)
    let newObj = obj

    newObj.categoryChannel = ticketsCategoryCategoryStr || obj.categoryChannel
    newObj.maxTickets = ticketsCategoryMaxTickets || obj.maxTickets
    newObj.supportRoles = ticketsCategorySupportRoles.length > 0 ? ticketsCategorySupportRoles : obj.supportRoles
    newObj.welcomeMessage.message = ticketsCategoryWelcomeMessageMessage || obj.welcomeMessage.message
    newObj.welcomeMessage.color = ticketsCategoryWelcomeMessageColor || obj.welcomeMessage.color || "#000000"
    newObj.deleteOnClose = ticketsCategoryDeleteOnClose || obj.deleteOnClose
    newObj.moveToClosedCategory = ticketsCategoryMoveToClosedCategory || obj.moveToClosedCategory

    data.settings.categories[index] = newObj
    setTicketCategoriesArray(data.settings.categories)
    postModuleSettings(guildId, 'tickets', data, Store)

    setTicketsCategoryCategoryStr('')
    setTicketsCategoryMaxTickets(undefined)
    setTicketsCategorySupportRoles([])
    setTicketsCategoryWelcomeMessageMessage(undefined)
    setTicketsCategoryWelcomeMessageColor("#000000")
    setTicketsCategoryDeleteOnClose(undefined)
    setTicketsCategoryMoveToClosedCategory(undefined)
  }

  const handleAddTicketCategory = (e: any) => {
    if (!ticketsCategoryWelcomeMessageMessage || !ticketsCategoryLabel) return Store.addNotification({
      title: 'Error',
      message: 'Please fill out all required fields (label, welcome message).',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true
      }
    })
    if (data.settings.categories.filter((obj: any) => obj.label === ticketsCategoryLabel).length > 0) return Store.addNotification({
      title: 'Error',
      message: 'A category with that label already exists.',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true
      }
    })
    if (data.settings.categories.length >= 15) return Store.addNotification({
      title: 'Error',
      message: 'You can only have 15 categories.',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true
      }
    })
    let newObj = {
      categoryChannel: ticketsCategoryCategoryStr,
      maxTickets: ticketsCategoryMaxTickets || 0,
      supportRoles: ticketsCategorySupportRoles,
      welcomeMessage: {
        message: ticketsCategoryWelcomeMessageMessage,
        color: ticketsCategoryWelcomeMessageColor || "#000000"
      },
      deleteOnClose: ticketsCategoryDeleteOnClose,
      moveToClosedCategory: ticketsCategoryMoveToClosedCategory,
      label: ticketsCategoryLabel
    }

    data.settings.categories.push(newObj)
    setTicketCategoriesArray(data.settings.categories)
    postModuleSettings(guildId, 'tickets', data, Store)

    setTicketsCategoryCategoryStr('')
    setTicketsCategoryMaxTickets(undefined)
    setTicketsCategorySupportRoles([])
    setTicketsCategoryWelcomeMessageMessage(undefined)
    setTicketsCategoryWelcomeMessageColor("#000000")
    setTicketsCategoryDeleteOnClose(undefined)
    setTicketsCategoryMoveToClosedCategory(undefined)
    setTicketsCategoryLabel(undefined)
  }

  const handleTicketsCategoryCategoryChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    setTicketsCategoryCategoryStr(newValue)
  }

  const handleTicketsCategorySupportRolesChange = (value: any) => {
    setTicketsCategorySupportRoles(value.map((role: any) => role.value))
  }

  const handlePanelMessageChannelSelectChange = (value: any) => {
    let newValue = value?.value
    if (value === null) newValue = ""
    data.settings.panelMessage.channel = newValue
    postModuleSettings(guildId, 'tickets', data, Store)
  }

  const handleSavePanelMessage = (e: any) => {
    e.preventDefault()
    const panelMessage = {
      title: ticketsPanelMessageTitle || data.settings.panelMessage.message.title,
      description: ticketsPanelMessageDescription || data.settings.panelMessage.message.description,
      color: ticketsPanelMessageColor || data.settings.panelMessage.message.color || "#000000",
      titleUrl: ticketsPanelMessageTitleUrl || data.settings.panelMessage.message.titleUrl,
      image: ticketsPanelMessageImage || data.settings.panelMessage.message.image,
      thumbnail: ticketsPanelMessageThumbnail || data.settings.panelMessage.message.thumbnail,
      timestamp: ticketsPanelMessageTimestamp || data.settings.panelMessage.message.timestamp,
    }
    data.settings.panelMessage.message = panelMessage

    if (!data.settings.panelMessage.channel) return Store.addNotification({
      title: 'Error',
      message: 'Please select a channel to send the panel to.',
      type: 'danger',
      insert: 'bottom',
      container: 'bottom-right',
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
        showIcon: true
      }
    })

    postModuleSettings(guildId, 'tickets', { updatePanelMessage: true, ...data }, Store)
    setTicketsPanelExists(true)
  }

  const handleDeletePanelMessage = (e: any) => {
    e.preventDefault()
    postModuleSettings(guildId, 'tickets', { deletePanelMessage: true }, Store)
    setTicketsPanelExists(false)
  }


  return (
    <div>
      <Navbar user={user} />
      <section className="min-vh-80 mt-8">
        <div className="container">
          <h1 className="text-3xl text-center">Tickets Module</h1>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">General Settings</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsEnabled || data.settings.enabled} id="ticketsEnabled" name="ticketsEnabled" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="ticketsEnabled">Enable/Disable Module</label>
                </div>
                <label htmlFor="ticketsLogChannel" className="text-light mt-3">Tickets Actions Log Channel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.logChannel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="ticketsLogChannel"
                  id="ticketsLogChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleLogChannelSelectChange}
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
                <label htmlFor="ticketsClosedCategory" className="text-light mt-3">Category for Closed Tickets</label>
                <Select
                  defaultValue={categories?.filter(c => data.settings.closedCategory === c.id).map(c => { return { value: c.id, label: c.name } })}
                  name="ticketsClosedCategory"
                  id="ticketsClosedCategory"
                  options={categories?.map(c => ({ value: c.id, label: c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handleClosedCategorySelectChange}
                  placeholder="Select Category"
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
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Tickets Panel Message</h4>
                <label htmlFor="ticketsLogChannel" className="text-light mt-3">Channel where to send the panel</label>
                <Select
                  defaultValue={channels?.filter(c => data.settings.panelMessage.channel === c.id).map(c => { return { value: c.id, label: '#' + c.name } })}
                  name="ticketsLogChannel"
                  id="ticketsLogChannel"
                  options={channels?.map(c => ({ value: c.id, label: '#' + c.name }))}
                  className='channel-role-select text-sm'
                  onChange={handlePanelMessageChannelSelectChange}
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

                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                  <label className="text-light text-xs" htmlFor="ticketsPanelMessageTitle">
                    Embed Title
                  </label>
                  <input maxLength={256} type='text' className="form-control ms-auto text-white" value={ticketsPanelMessageTitle || data.settings.panelMessage.message.title} id="ticketsPanelMessageTitle" name="ticketsPanelMessageTitle" onChange={handleChange} />
                </div>
                <div className="input-group input-group-static ps-0 ms-1 mt-3">
                  <label className="text-light text-xs" htmlFor="ticketsPanelMessageTitleUrl">
                    Embed Title Url
                  </label>
                  <input type='url' className="form-control ms-auto text-white" value={ticketsPanelMessageTitleUrl || data.settings.panelMessage.message.titleUrl} id="ticketsPanelMessageTitleUrl" name="ticketsPanelMessageTitleUrl" onChange={handleChange} />
                </div>

                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                  <label className="text-light text-xs" htmlFor="ticketsPanelMessageDescription">
                    Embed Description
                  </label>
                  <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={ticketsPanelMessageDescription || data.settings.panelMessage.message.description} id="ticketsPanelMessageDescription" name="ticketsPanelMessageDescription" onChange={handleChange} />
                </div>
                <a href="https://wiki.lambdadev.xyz/bot/dashboard/placeholders" target='_blank' rel="noreferrer" style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                  <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                  <span>Learn about the <span className="text-white">placeholders</span></span>
                  <span className="cursor-pointer ms-1 text-xs material-icons-round text-white">open_in_new</span>
                </a>

                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                  <label className="text-light text-xs" htmlFor="ticketsPanelMessageThumbnail">
                    Embed Thumbnail Url
                  </label>
                  <input type='url' className="form-control ms-auto text-white" value={ticketsPanelMessageThumbnail || data.settings.panelMessage.message.thumbnail} id="ticketsPanelMessageThumbnail" name="ticketsPanelMessageThumbnail" onChange={handleChange} />
                </div>
                <div className="input-group input-group-static ps-0 ms-1 mt-3">
                  <label className="text-light text-xs" htmlFor="ticketsPanelMessageImage">
                    Embed Image Url
                  </label>
                  <input type='url' className="form-control ms-auto text-white" value={ticketsPanelMessageImage || data.settings.panelMessage.message.image} id="ticketsPanelMessageImage" name="ticketsPanelMessageImage" onChange={handleChange} />
                </div>

                <div className="row d-flex align-items-center mt-4">
                  <div className="col-4">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <label className="text-light text-xs" htmlFor="ticketsPanelMessageColor">
                        Embed Colour
                      </label>
                      <input type='color' className="form-control ms-auto text-white cursor-pointer" value={ticketsPanelMessageColor || data.settings.panelMessage.message.color} id="ticketsPanelMessageColor" name="ticketsPanelMessageColor" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="input-group input-group-static ps-0 ms-1">
                      <div className="form-check form-switch ps-0 ms-1">
                        <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsPanelMessageTimestamp || data.settings.panelMessage.message.timestamp} id="ticketsPanelMessageTimestamp" name="ticketsPanelMessageTimestamp" onChange={handleChange} />
                        <label className="form-check-label ms-3 text-light" htmlFor="ticketsPanelMessageTimestamp">Show Timestamp in Embed</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {
                      ticketsPanelExists ?
                        <div className="d-flex gap-2 align-items-center">
                          <button className="btn btn-success btn-sm mt-4" onClick={handleSavePanelMessage}>Update Panel</button>
                          <button className="btn btn-danger btn-sm mt-4" onClick={handleDeletePanelMessage}>Delete Panel</button>
                        </div> :
                        <button className="btn btn-primary btn-sm mt-4" onClick={handleSavePanelMessage}>Send Panel</button>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="card card-body dash-card p-4">
                <h4 className="text-center">Ticket Categories</h4>
                {
                  ticketCategoriesArray.length > 0 ?
                    ticketCategoriesArray.map((ticketCategory: {
                      categoryChannel: string,
                      label: string,
                      maxTickets: number,
                      supportRoles: string[],
                      welcomeMessage: {
                        message: string,
                        color: string,
                      },
                      deleteOnClose: boolean,
                      moveToClosedCategory: boolean,
                    }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + ticketCategory.label.replaceAll(/\s/g, '_')} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Ticket Category #{index + 1}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Label</label>
                                  <input className="form-control text-light" disabled value={ticketCategory.label} />
                                </div>
                                <label htmlFor="ticketsCategoryCategory" className="text-light mt-3">Category</label>
                                <Select
                                  defaultValue={categories?.filter(c => ticketCategory.categoryChannel === c.id).map(c => { return { value: c.id, label: c.name } })}
                                  name="ticketsCategoryCategory"
                                  id="ticketsCategoryCategory"
                                  options={categories?.map(c => ({ value: c.id, label: c.name }))}
                                  className='channel-role-select text-sm'
                                  onChange={handleTicketsCategoryCategoryChange}
                                  placeholder="Select Category"
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
                                <label htmlFor="ticketsCategorySupportRoles" className="text-light mt-3">Support Roles</label>
                                <Select
                                  defaultValue={roles?.filter(r => ticketCategory.supportRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                                  isMulti
                                  name="ticketsCategorySupportRoles"
                                  id="ticketsCategorySupportRoles"
                                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                                  className='channel-role-select text-sm'
                                  onChange={handleTicketsCategorySupportRolesChange}
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

                                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryMaxTickets">
                                    Maximum Amount of Tickets a User can Create
                                  </label>
                                  <input type='number' min={0} className="form-control ms-auto text-white" value={ticketsCategoryMaxTickets || ticketCategory.maxTickets} id="ticketsCategoryMaxTickets" name="ticketsCategoryMaxTickets" onChange={handleChange} />
                                </div>
                                <div style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                                  <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                                  <span>Set to <span className="text-white">0</span> to disable</span>
                                </div>

                                <div className="form-check form-switch ps-0 ms-1 mt-4">
                                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryDeleteOnClose || ticketCategory.deleteOnClose} id="ticketsCategoryDeleteOnClose" name="ticketsCategoryDeleteOnClose" onChange={handleChange} />
                                  <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryDeleteOnClose">Delete Ticket on Close</label>
                                </div>
                                <div className="form-check form-switch ps-0 ms-1">
                                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryMoveToClosedCategory || ticketCategory.deleteOnClose} id="ticketsCategoryMoveToClosedCategory" name="ticketsCategoryMoveToClosedCategory" onChange={handleChange} />
                                  <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryMoveToClosedCategory">Move to Closed Tickets Category on Close</label>
                                </div>

                                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageMessage">
                                    Welcome Message Embed Description
                                  </label>
                                  <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={ticketsCategoryWelcomeMessageMessage || ticketCategory.welcomeMessage.message} id="ticketsCategoryWelcomeMessageMessage" name="ticketsCategoryWelcomeMessageMessage" onChange={handleChange} />
                                </div>
                                <div className="input-group input-group-static ps-0 ms-1 mt-3">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageColor">
                                    Welcome Message Embed Colour
                                  </label>
                                  <input type='color' className="form-control ms-auto text-white cursor-pointer" value={ticketsCategoryWelcomeMessageColor || ticketCategory.welcomeMessage.color} id="ticketsCategoryWelcomeMessageColor" name="ticketsCategoryWelcomeMessageColor" onChange={handleChange} />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditTicketCategory} name={ticketCategory.label}>Save changes</button>
                                <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) :
                    data.settings.categories.map((ticketCategory: {
                      categoryChannel: string,
                      label: string,
                      maxTickets: number,
                      supportRoles: string[],
                      welcomeMessage: {
                        message: string,
                        color: string,
                      },
                      deleteOnClose: boolean,
                      moveToClosedCategory: boolean,
                    }, index: number) => {
                      return (
                        <div className="modal fade" id={"modal" + ticketCategory.label.replaceAll(/\s/g, '_')} tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                          <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">Edit Ticket Category #{index + 1}</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true"></span>
                                </button>
                              </div>
                              <div className="modal-body text-light">
                                <div className="input-group input-group-static">
                                  <label className="text-light">Label</label>
                                  <input className="form-control text-light" disabled value={ticketCategory.label} />
                                </div>
                                <label htmlFor="ticketsCategoryCategory" className="text-light mt-3">Category</label>
                                <Select
                                  defaultValue={categories?.filter(c => ticketCategory.categoryChannel === c.id).map(c => { return { value: c.id, label: c.name } })}
                                  name="ticketsCategoryCategory"
                                  id="ticketsCategoryCategory"
                                  options={categories?.map(c => ({ value: c.id, label: c.name }))}
                                  className='channel-role-select text-sm'
                                  onChange={handleTicketsCategoryCategoryChange}
                                  placeholder="Select Category"
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
                                <label htmlFor="ticketsCategorySupportRoles" className="text-light mt-3">Support Roles</label>
                                <Select
                                  defaultValue={roles?.filter(r => ticketCategory.supportRoles.includes(r.id)).map(r => { return { value: r.id, label: '@' + r.name } })}
                                  isMulti
                                  name="ticketsCategorySupportRoles"
                                  id="ticketsCategorySupportRoles"
                                  options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                                  className='channel-role-select text-sm'
                                  onChange={handleTicketsCategorySupportRolesChange}
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

                                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryMaxTickets">
                                    Maximum Amount of Tickets a User can Create
                                  </label>
                                  <input type='number' min={0} className="form-control ms-auto text-white" value={ticketsCategoryMaxTickets || ticketCategory.maxTickets} id="ticketsCategoryMaxTickets" name="ticketsCategoryMaxTickets" onChange={handleChange} />
                                </div>
                                <div style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                                  <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                                  <span>Set to <span className="text-white">0</span> to disable</span>
                                </div>

                                <div className="form-check form-switch ps-0 ms-1 mt-4">
                                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryDeleteOnClose || ticketCategory.deleteOnClose} id="ticketsCategoryDeleteOnClose" name="ticketsCategoryDeleteOnClose" onChange={handleChange} />
                                  <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryDeleteOnClose">Delete Ticket on Close</label>
                                </div>
                                <div className="form-check form-switch ps-0 ms-1">
                                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryMoveToClosedCategory || ticketCategory.deleteOnClose} id="ticketsCategoryMoveToClosedCategory" name="ticketsCategoryMoveToClosedCategory" onChange={handleChange} />
                                  <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryMoveToClosedCategory">Move to Closed Tickets Category on Close</label>
                                </div>

                                <div className="input-group input-group-static ps-0 ms-1 mt-4">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageMessage">
                                    Welcome Message Embed Description
                                  </label>
                                  <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={ticketsCategoryWelcomeMessageMessage || ticketCategory.welcomeMessage.message} id="ticketsCategoryWelcomeMessageMessage" name="ticketsCategoryWelcomeMessageMessage" onChange={handleChange} />
                                </div>
                                <div className="input-group input-group-static ps-0 ms-1 mt-3">
                                  <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageColor">
                                    Welcome Message Embed Colour
                                  </label>
                                  <input type='color' className="form-control ms-auto text-white cursor-pointer" value={ticketsCategoryWelcomeMessageColor || ticketCategory.welcomeMessage.color} id="ticketsCategoryWelcomeMessageColor" name="ticketsCategoryWelcomeMessageColor" onChange={handleChange} />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleEditTicketCategory} name={ticketCategory.label}>Save changes</button>
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
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Label</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Max Tickets</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2">Category</th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                        <th className="text-uppercase text-primary text-xs font-weight-bolder opacity-9 ps-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        ticketCategoriesArray.length > 0 ?
                          ticketCategoriesArray.map((ticketCategory: {
                            categoryChannel: string;
                            label: string;
                            maxTickets: number;
                            supportRoles: string[];
                            welcomeMessage: {
                              message: string;
                              color: string;
                            };
                            deleteOnClose: boolean;
                            moveToClosedCategory: boolean;
                          }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">{ticketCategory.label}</td>
                                <td className='text-sm text-light'>{ticketCategory.maxTickets === 0 ? 'Disabled' : ticketCategory.maxTickets}</td>
                                <td className='text-sm text-light'>{categories?.find(c => c.id === ticketCategory.categoryChannel)?.name || 'No Category'}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + ticketCategory.label.replaceAll(/\s/g, '_')}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={ticketCategory.label} onClick={handleDeleteTicketCategory} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
                                  </Tooltip>
                                </td>
                              </tr>
                            )
                          }) :
                          data.settings.categories.map((ticketCategory: {
                            categoryChannel: string;
                            label: string;
                            maxTickets: number;
                            supportRoles: string[];
                            welcomeMessage: {
                              message: string;
                              color: string;
                            };
                            deleteOnClose: boolean;
                            moveToClosedCategory: boolean;
                          }, index: number) => {
                            return (
                              <tr>
                                <td className="text-sm text-light text-center">{index + 1}</td>
                                <td className="text-sm text-light">{ticketCategory.label}</td>
                                <td className='text-sm text-light'>{ticketCategory.maxTickets === 0 ? 'Disabled' : ticketCategory.maxTickets}</td>
                                <td className='text-sm text-light'>{categories?.find(c => c.id === ticketCategory.categoryChannel)?.name || 'No Category'}</td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Edit">
                                    <span className="material-icons-round text-sm text-light cursor-pointer" data-bs-toggle="modal" data-bs-target={"#modal" + ticketCategory.label.replaceAll(/\s/g, '_')}>edit</span>
                                  </Tooltip>
                                </td>
                                <td className='text-light text-center'>
                                  <Tooltip arrow placement='bottom' title="Remove">
                                    <span id={ticketCategory.label} onClick={handleDeleteTicketCategory} className="material-icons-round text-sm text-danger cursor-pointer">close</span>
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
                        <h6 className="modal-title" id="modal-title-default">Add Ticket Category</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="modal-body text-light">
                        <div className="input-group input-group-static ps-0 ms-1 mt-4">
                          <label className="text-light text-xs" htmlFor="ticketsCategoryLabel">
                            Category Label
                          </label>
                          <input type='text' maxLength={80} className="form-control ms-auto text-white" value={ticketsCategoryLabel || ''} id="ticketsCategoryLabel" name="ticketsCategoryLabel" onChange={handleChange} />
                        </div>
                        <label htmlFor="ticketsCategoryCategory" className="text-light mt-3">Category</label>
                        <Select
                          name="ticketsCategoryCategory"
                          id="ticketsCategoryCategory"
                          options={categories?.map(c => ({ value: c.id, label: c.name }))}
                          className='channel-role-select text-sm'
                          onChange={handleTicketsCategoryCategoryChange}
                          placeholder="Select Category"
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
                        <label htmlFor="ticketsCategorySupportRoles" className="text-light mt-3">Support Roles</label>
                        <Select
                          isMulti
                          name="ticketsCategorySupportRoles"
                          id="ticketsCategorySupportRoles"
                          options={roles?.map(r => ({ value: r.id, label: '@' + r.name }))}
                          className='channel-role-select text-sm'
                          onChange={handleTicketsCategorySupportRolesChange}
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

                        <div className="input-group input-group-static ps-0 ms-1 mt-4">
                          <label className="text-light text-xs" htmlFor="ticketsCategoryMaxTickets">
                            Maximum Amount of Tickets a User can Create
                          </label>
                          <input type='number' min={0} className="form-control ms-auto text-white" value={ticketsCategoryMaxTickets || 0} id="ticketsCategoryMaxTickets" name="ticketsCategoryMaxTickets" onChange={handleChange} />
                        </div>
                        <div style={{ color: '#dcddde' }} className="text-xxs d-flex align-items-center justify-content-start mt-1 ms-1">
                          <span className="cursor-pointer me-1 text-xs material-icons-round" style={{ 'color': '#dcddde' }}>help_outline</span>
                          <span>Set to <span className="text-white">0</span> to disable</span>
                        </div>

                        <div className="form-check form-switch ps-0 ms-1">
                          <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryDeleteOnClose || false} id="ticketsCategoryDeleteOnClose" name="ticketsCategoryDeleteOnClose" onChange={handleChange} />
                          <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryDeleteOnClose">Delete Ticket on Close</label>
                        </div>
                        <div className="form-check form-switch ps-0 ms-1">
                          <input className="form-check-input ms-auto mt-1" type="checkbox" checked={ticketsCategoryMoveToClosedCategory || false} id="ticketsCategoryMoveToClosedCategory" name="ticketsCategoryMoveToClosedCategory" onChange={handleChange} />
                          <label className="form-check-label ms-3 text-light" htmlFor="ticketsCategoryMoveToClosedCategory">Move to Closed Tickets Category on Close</label>
                        </div>

                        <div className="input-group input-group-static ps-0 ms-1 mt-4">
                          <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageMessage">
                            Welcome Message Embed Description
                          </label>
                          <textarea maxLength={4096} rows={3} className="form-control ms-auto text-white" value={ticketsCategoryWelcomeMessageMessage || ''} id="ticketsCategoryWelcomeMessageMessage" name="ticketsCategoryWelcomeMessageMessage" onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-static ps-0 ms-1">
                          <label className="text-light text-xs" htmlFor="ticketsCategoryWelcomeMessageColor">
                            Welcome Message Embed Colour
                          </label>
                          <input type='color' className="form-control ms-auto text-white cursor-pointer" value={ticketsCategoryWelcomeMessageColor || ''} id="ticketsCategoryWelcomeMessageColor" name="ticketsCategoryWelcomeMessageColor" onChange={handleChange} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal" onClick={handleAddTicketCategory}>Add Category</button>
                        <button type="button" className="btn btn-link ml-auto" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-icon bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" data-bs-toggle="modal" data-bs-target='#modal-create'>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="material-icons ms-2" aria-hidden="true">add</i>
                    Add Ticket Category
                  </div>
                </div>
              </div>
              <div className="card card-body dash-card p-4 mt-4">
                <h4 className="text-center">Module Commands</h4>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={addCommand || data.commands.add} id="addCommand" name="addCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="addCommand">Add members to ticket <br /> <code>/ticket add &lt;member&gt;</code></label>
                </div>

                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={removeCommand || data.commands.remove} id="removeCommand" name="removeCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="removeCommand">Remove members from ticket <br /> <code>/ticket remove &lt;member&gt;</code></label>
                </div>

                <div className="form-check form-switch ps-0 ms-1 mt-2">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={closeCommand || data.commands.close} id="closeCommand" name="closeCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="closeCommand">Close a ticket <br /> <code>/ticket close [delete]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={transcriptCommand || data.commands.transcript} id="transcriptCommand" name="transcriptCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="transcriptCommand">Transcript a ticket channel <br /> <code>/ticket transcript [channel]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={reopenCommand || data.commands.reopen} id="reopenCommand" name="reopenCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="reopenCommand">Reopen a ticket <br /> <code>/ticket reopen &lt;ping_members&gt;</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={deleteCommand || data.commands.delete} id="deleteCommand" name="deleteCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="deleteCommand">Delete a closed ticket <br /> <code>/ticket delete</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={claimCommand || data.commands.claim} id="claimCommand" name="claimCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="claimCommand">Claim a ticket <br /> <code>/ticket claim [lock_staff]</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={unclaimCommand || data.commands.unclaim} id="unclaimCommand" name="unclaimCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="unclaimCommand">Unclaim a ticket <br /> <code>/ticket unclaim</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={lockCommand || data.commands.lock} id="lockCommand" name="lockCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="lockCommand">Lock a ticket (members can't type) <br /> <code>/ticket lock</code></label>
                </div>
                <div className="form-check form-switch ps-0 ms-1">
                  <input className="form-check-input ms-auto mt-1" type="checkbox" checked={unlockCommand || data.commands.unlock} id="unlockCommand" name="unlockCommand" onChange={handleChange} />
                  <label className="form-check-label ms-3 text-light" htmlFor="unlockCommand">Unlock a ticket <br /> <code>/ticket unlock</code></label>
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