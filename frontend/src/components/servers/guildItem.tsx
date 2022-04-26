import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteContext } from "../../utils/contexts/InviteContext"
import { PartialGuild } from "../../utils/typings/Guild"

export const GuildItem = ({ guild }: { guild: PartialGuild }) => {
    const navigate = useNavigate()
    const [guildId, setGuildId] = useState(localStorage.getItem('guildId') || '')
    const { setUrl } = useContext(InviteContext)

    useEffect(() => {
        localStorage.setItem('guildId', guildId)
    }, [guildId])

    const handleClick = (guildId: string) => {
        if (guild.botIn) {
            localStorage.setItem('guildId', guildId)
            setGuildId(guildId)
            navigate("/dashboard")
        } else {
            localStorage.setItem('guildId', guildId)
            setGuildId(guildId)
            setUrl("api_invite")
            navigate("/invite")
        }
    }

    return (
        <div className="col-12 col-md-4 col-lg-3">
            <div className="card card-body container align-items-center cursor-pointer move-on-hover shadow-sm guild-card mb-5" onClick={() => handleClick(guild.id)}>
                <div className="row">
                    <h6 className="text-center">{guild.name}</h6>
                </div>
                <div className="row">
                    {
                        guild.icon ?
                            <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`} alt="" className="server-icon mt-2" /> :
                            <img src="https://cdn.discordapp.com/attachments/906148996643446825/960883775171080263/unknown.png" alt="" className="server-icon mt-2" />
                    }
                </div>
                <div className="row">
                    <p className="text-sm mt-2 mb-4">
                        {
                            guild.role === 'admin' ? 'Administrator' : (guild.role === 'owner' ? 'Owner' : 'Server Manager')
                        }
                    </p>
                </div>
                <div className="row">
                    <div className="btn btn-icon mb-0 me-1 mt-2 mt-md-0 text-white">
                        <div className={guild.botIn ? "d-flex align-items-center text-primary" : "d-flex align-items-center"}>
                            {guild.botIn ? "Dashboard" : "Add bot"}
                            <i className="material-icons ms-2" aria-hidden="true">{guild.botIn ? "login" : "add"}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}