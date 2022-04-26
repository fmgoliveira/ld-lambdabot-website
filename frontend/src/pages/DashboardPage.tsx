import { Footer, Navbar } from "../components/dashboard"
import { User } from "../utils/typings/User"

export const DashboardPage = ({ user }: { user: User }) => {
    return (
        <div>
            <Navbar user={user} />
            <section className="min-vh-80 mt-8">
                <div className="container">
                    <div className="row px-4 mt-4">
                        <div className="card card-body category-card shadow-sm">
                            <h5 className="text-primary text-center">Insights</h5>
                            <div className="row">
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/insights/dashboard'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">dashboard</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Dashboard</h6>
                                            <small>Check few quick statistics about your server</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/insights/members'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">people</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Members</h6>
                                            <small>List all the members of your server</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/insights/logs'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">notes</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Action Logs</h6>
                                            <small>Check all the actions performed with the bot</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-4 mt-4">
                        <div className="card card-body category-card shadow-sm">
                            <h5 className="text-primary text-center">Server Management</h5>
                            <div className="row">
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/settings'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">settings</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Administration</h6>
                                            <small>Setup general administration settings</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/welcome'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">waving_hand</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Welcome & Leave</h6>
                                            <small>Configure welcome and farewell module</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/moderation'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">handyman</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Moderation</h6>
                                            <small>Configure moderation and automod modules</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/logging'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">description</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Logging</h6>
                                            <small>Setup action logging module</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-4 mt-4">
                        <div className="card card-body category-card shadow-sm">
                            <h5 className="text-primary text-center">Utility Modules</h5>
                            <div className="row">
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/tickets'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">confirmation_number</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Tickets</h6>
                                            <small>Setup tickets module, categories and panel</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/verification'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">verified_user</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Verification</h6>
                                            <small>Configure user verification module</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/levels'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">emoji_events</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Levels</h6>
                                            <small>Setup the leveling/XP module and its messages</small>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-12 col-lg-4 mt-2">
                                    <div className="card card-body cursor-pointer move-on-hover" onClick={() => window.location.href = '/manage/reaction-roles'}>
                                        <div className="row">
                                            <span className="material-icons text-primary text-7xl">manage_accounts</span>
                                        </div>
                                        <div className="row mt-2 ps-1">
                                            <h6 className="text-bold">Reaction Roles</h6>
                                            <small>Configure the reaction roles in your server</small>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}