import logo from "../../assets/img/logo32.ico";
import { User } from "../../utils/typings/User";
import { UserItem } from "./userItem";

export const Navbar = ({ user }: { user: User }) => {
    return (
        <div className="container position-sticky z-index-sticky top-0">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-0 start-0 end-0 mx-4">
                        <div className="container-fluid">
                            <a className="navbar-brand font-weight-bolder ms-sm-3 my-2" href="/">
                                <img src={logo} className="rounded" alt="" style={{ "marginRight": "12px" }} />
                                Lambda Bot
                            </a>
                            <button className="navbar-toggler shadow-none ms-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon mt-2">
                                    <span className="navbar-toggler-bar bar1"></span>
                                    <span className="navbar-toggler-bar bar2"></span>
                                    <span className="navbar-toggler-bar bar3"></span>
                                </span>
                            </button>
                            <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0" id="navigation">
                                <div className="navbar-nav navbar-nav-hover w-100">
                                    <ul className="navbar-nav navbar-nav-hover mx-lg-auto">
                                        <li className="nav-item dropdown dropdown-hover">
                                            <div className="nav-link ps-2 d-flex cursor-pointer align-items-center my-lg-2" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="material-icons opacity-6 me-2 text-md">insights</i>
                                                Insights
                                                <i className="material-icons opacity-8 me-2 text-md">expand_more</i>
                                            </div>

                                            <ul className="dropdown-menu dropdown-menu-animation dropdown-lg mt-0 mt-lg-3 p-3 border-radius-lg" aria-labelledby="dropdownMenuDocs">
                                                <div className="d-none d-lg-block">
                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/insights/dashboard">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">dashboard</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Dashboard</h6>
                                                                    <span className="text-sm">Check few quick statistics about your server</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/insights/members">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">people</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Members</h6>
                                                                    <span className="text-sm">List all the members of your server</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/insights/logs">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">notes</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Action Logs</h6>
                                                                    <span className="text-sm">Check all the actions performed</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </div>

                                                <div className="row d-lg-none">
                                                    <div className="col-md-12 g-0">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">dashboard</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Dashboard</h6>
                                                                    <span className="text-sm">Check few quick statistics about your server</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/members">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">people</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Members</h6>
                                                                    <span className="text-sm">List all the members of your server</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/logs">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">notes</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Action Logs</h6>
                                                                    <span className="text-sm">Check all the actions performed</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>

                                        <li className="nav-item dropdown dropdown-hover">
                                            <div className="nav-link ps-2 d-flex cursor-pointer align-items-center my-lg-2" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="material-icons opacity-6 me-2 text-md">grid_view</i>
                                                Modules
                                                <i className="material-icons opacity-8 me-2 text-md">expand_more</i>
                                            </div>

                                            <ul className="dropdown-menu dropdown-menu-animation dropdown-lg mt-0 mt-lg-3 p-3 border-radius-lg" aria-labelledby="dropdownMenuDocs">
                                                <div className="d-none d-lg-block">
                                                    <li className="nav-item">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/settings">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">settings</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Administration</h6>
                                                                    <span className="text-sm">Setup general administration settings</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/welcome">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">waving_hand</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Welcome & Leave</h6>
                                                                    <span className="text-sm">Configure welcome & farewell module</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/tickets">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">confirmation_number</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Tickets</h6>
                                                                    <span className="text-sm">Setup tickets module & categories</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/moderation">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">handyman</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Moderation</h6>
                                                                    <span className="text-sm">Configure moderation & automod modules</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/logging">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">description</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Logging</h6>
                                                                    <span className="text-sm">Setup action logging module</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item ">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/verification">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">verified_user</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Verification</h6>
                                                                    <span className="text-sm">Configure user verification module</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/levels">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">emoji_events</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Levels</h6>
                                                                    <span className="text-sm">Setup the leveling/XP module</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
{/* 
                                                    <li className="nav-item">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/reaction-roles">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">manage_accounts</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Reaction Roles</h6>
                                                                    <span className="text-sm">Configure the reaction roles in your server</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li> */}
                                                </div>

                                                <div className="row d-lg-none">
                                                    <div className="col-md-12 g-0">
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/settings">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">settings</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Administration</h6>
                                                                    <span className="text-sm">Setup general administration settings</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/welcome">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">waving_hand</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Welcome & Leave</h6>
                                                                    <span className="text-sm">Configure welcome & farewell module</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/tickets">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">confirmation_number</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Tickets</h6>
                                                                    <span className="text-sm">Setup tickets module & categories</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/moderation">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">handyman</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Moderation</h6>
                                                                    <span className="text-sm">Configure moderation & automod modules</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/logging">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">description</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Logging</h6>
                                                                    <span className="text-sm">Setup action logging module</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/verification">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">verified_user</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Verification</h6>
                                                                    <span className="text-sm">Configure user verification module</span>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/levels">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">emoji_events</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Levels</h6>
                                                                    <span className="text-sm">Setup the leveling/XP module</span>
                                                                </div>
                                                            </div>
                                                        </a>
{/* 
                                                        <a className="dropdown-item py-2 ps-3 border-radius-md" href="/manage/reaction-roles">
                                                            <div className="d-flex">
                                                                <div className="icon h-10 me-3 d-flex mt-1">
                                                                    <i className="material-icons opacity-6 me-2 text-md">manage_accounts</i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="dropdown-header font-weight-bolder d-flex justify-content-cente align-items-center p-0">Reaction Roles</h6>
                                                                    <span className="text-sm">Configure the reaction roles in your server</span>
                                                                </div>
                                                            </div>
                                                        </a> */}
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>

                                        <li className="nav-item ms-lg-2 my-lg-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/invite" target="_blank">
                                                Invite
                                            </a>
                                        </li>

                                        <li className="nav-item my-lg-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/support" target="_blank">
                                                Support
                                            </a>
                                        </li>

                                        <li className="nav-item d-none d-lg-block ms-lg-1 my-lg-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/docs" target="_blank">
                                                <i className="material-icons opacity-5 me-2">help_outline</i>
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li className="nav-item d-lg-none ms-lg-1 my-lg-2">
                                            <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/docs" target="_blank">
                                                Documentation
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <ul className="navbar-nav navbar-nav-hover w-100 w-lg-25 w-xl-15">
                                    <li className="nav-item dropdown dropdown-hover ms-lg-auto my-auto ms-0 ms-lg-0">
                                        <UserItem user={user} />

                                        <div className="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-lg mt-0 mt-lg-3" aria-labelledby="dropdownMenuPages">
                                            <div className="d-none d-lg-block">
                                                <a href="/servers" className="dropdown-item border-radius-md">
                                                    My Servers
                                                </a>
                                                <a href="/logout" className="dropdown-item border-radius-md text-danger">
                                                    Logout
                                                </a>
                                            </div>

                                            <div className="d-lg-none">
                                                <a href="/servers" className="dropdown-item border-radius-md">
                                                    My Servers
                                                </a>
                                                <a href="/logout" className="dropdown-item border-radius-md">
                                                    Logout
                                                </a>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav >
                </div >
            </div >
        </div >
    )
}