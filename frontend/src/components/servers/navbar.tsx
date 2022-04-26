import logo from "../../assets/img/logo32.ico"
import { User } from "../../utils/typings/User"
import { UserItem } from "./userItem"

export const Navbar = ({ user }: { user: User }) => {
    return (
        <div className="container position-sticky z-index-sticky top-0">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                        <div className="container-fluid">
                            <a className="navbar-brand font-weight-bolder ms-sm-3" href="/">
                                <img src={logo} className="rounded" alt="" style={{ "marginRight": "12px" }} />
                                Lambda Bot
                            </a>
                            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon mt-2">
                                    <span className="navbar-toggler-bar bar1"></span>
                                    <span className="navbar-toggler-bar bar2"></span>
                                    <span className="navbar-toggler-bar bar3"></span>
                                </span>
                            </button>
                            <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0" id="navigation">
                                <div className="navbar-nav navbar-nav-hover w-100">
                                    <ul className="navbar-nav navbar-nav-hover mx-lg-auto">
                                        <li className="nav-item mx-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/invite" target="_blank">
                                                Invite
                                            </a>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/docs" target="_blank">
                                                Documentation
                                            </a>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/support" target="_blank">
                                                Support
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <ul className="navbar-nav navbar-nav-hover w-100 w-lg-25 w-xl-15">
                                    <li className="nav-item dropdown dropdown-hover ms-lg-auto my-auto ms-0 ms-lg-0">
                                        <UserItem user={user} />

                                        <div className="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-lg mt-0 mt-lg-3" aria-labelledby="dropdownMenuPages">
                                            <div className="d-none d-lg-block">
                                                <a href="/logout" className="dropdown-item border-radius-md text-danger">
                                                    Logout
                                                </a>
                                            </div>

                                            <div className="d-lg-none">
                                                <a href="/logout" className="dropdown-item border-radius-md">
                                                    Logout
                                                </a>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}