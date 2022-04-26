import { User } from "../../utils/typings/User"

export const UserItem = ({ user }: { user: User }) => {
    return (
        <div className="mt-2 mt-lg-0 ps-2 nav-link d-flex ps-lg-2 cursor-pointer align-items-center" id="dropdownMenuUserLg" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.webp?size=1024`} alt="" className="d-lg-none user-icon mt-n6 mb-n6 me-2" />
            <b>{user.discordUsername}</b>
            <img src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.webp?size=1024`} alt="" className="d-none d-lg-block user-icon mt-n6 mb-n6 ms-2" />
            <i className="material-icons opacity-8 ms-2 text-md d-lg-none">expand_more</i>
        </div>
    )
}