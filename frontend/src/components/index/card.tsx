import bugsImg from "../../assets/img/bugs.png"
import helpImg from "../../assets/img/help.png"
import dashImg from "../../assets/img/dash.png"
import cardBg from "../../assets/img/card_bg1.jpg"
import { Feature } from "./feature"
import { useFetchBotStats } from "../../utils/hooks/useFetchBotStats"
import { Spinner } from "../spinner"

export const Card = () => {
    const { stats, loading } = useFetchBotStats()
    if (loading) return <Spinner />

    return (
        <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
            <section className="pt-3 pb-4" id="count-stats">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto py-3">
                            <div className="row">
                                <div className="col-md-4 position-relative">
                                    <div className="p-3 text-center">
                                        <h1 className="text-gradient text-primary"><span id="state1">{stats ? stats.guildCountStr : "50+"}</span></h1>
                                        <h5 className="mt-3">Servers</h5>
                                        <p className="text-sm font-weight-normal">The amount of servers that trust our bot and utilise it daily</p>
                                    </div>
                                    <hr className="vertical dark" />
                                </div>
                                <div className="col-md-4 position-relative">
                                    <div className="p-3 text-center">
                                        <h1 className="text-gradient text-primary"><span id="state1">{stats ? stats.memberCountStr : "125 K+"}</span></h1>
                                        <h5 className="mt-3">Users</h5>
                                        <p className="text-sm font-weight-normal">The amount of members of servers that have our bot in it</p>
                                    </div>
                                    <hr className="vertical dark" />
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 text-center">
                                        <h1 className="text-gradient text-primary"><span id="state1">50</span>+</h1>
                                        <h5 className="mt-3">Commands</h5>
                                        <p className="text-sm font-weight-normal">The commands our bot provides you to make your life in Discord easier</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 py-5" id="features">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
                            <div className="rotating-card-container">
                                <div className="card card-rotate card-background card-background-mask-primary shadow-primary mt-md-0 mt-5">
                                    <div className="front front-background" style={{ "backgroundImage": "url(../img/card_bg1.jpg)", "backgroundSize": "cover" }}>
                                        <div className="card-body py-7 text-center">
                                            <i className="material-icons text-white text-4xl my-3">touch_app</i>
                                            <h3 className="text-white">User Friendly<br />Clean & Simple</h3>
                                            <p className="text-white opacity-8">Our bot provides you everything you need to build and maintain a discord server</p>
                                        </div>
                                    </div>
                                    <div className="back back-background" style={{ "backgroundImage": "url(../img/card_bg2.jpg)", "backgroundSize": "cover" }}>
                                        <div className="card-body pt-7 text-center">
                                            <h3 className="text-white">Simple Dashboard</h3>
                                            <p className="text-white opacity-8"> Our dashboard makes it easier to setup and configure the bot.</p>
                                            <a href="/dashboard" target="_blank" className="btn btn-white w-50 mx-auto mt-3">Go to dashboard</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 ms-auto mt-6 mt-lg-0">
                            <div className="row justify-content-start">
                                <div className="col-md-6">
                                    <div className="info">
                                        <i className="material-icons text-gradient text-primary text-3xl">brush</i>
                                        <h5 className="font-weight-bolder mt-3">Clean Design</h5>
                                        <p className="pe-5">A modern design dashboard that you can use to configure the bot and cool embeds.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info">
                                        <i className="material-icons text-gradient text-primary text-3xl">security</i>
                                        <h5 className="font-weight-bolder mt-3">Security First</h5>
                                        <p className="pe-3">We care about your privacy. There is only one human that can access to the database.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start mt-5">
                                <div className="col-md-6 mt-3">
                                    <i className="material-icons text-gradient text-primary text-3xl">bolt</i>
                                    <h5 className="font-weight-bolder mt-3">Powerfull Features</h5>
                                    <p className="pe-5">Powerful features to manage and moderate your server and your members.</p>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="info">
                                        <i className="material-icons text-gradient text-primary text-3xl">schedule</i>
                                        <h5 className="font-weight-bolder mt-3">Uptime Guarantee</h5>
                                        <p className="pe-3">We guarantee you at 99% of uptime for the bot in test/beta mode and 99.99% in production mode.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-5">
                <div className="container text-2xl">
                    <div className="d-flex align-items-center justify-content-center gap-4">
                        <div className="w-40 w-xl-30 text-end">
                            <b>Bot version 2.3.0</b>
                        </div>
                        <a href="https://youtube.com" target="_blank">
                            <i className="material-icons text-9xl text-primary">play_circle_outline</i>
                        </a>
                        <div className="w-40 w-xl-30">
                            Check teaser video
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-5">
                <div className="container">
                    <Feature
                        coloredH3="Quick & Easy"
                        whiteH3="to Use"
                        p="Dynamic help menu that will allow you to get info about a command with just one click."
                        img={helpImg}
                    />

                    <Feature
                        coloredH3="Modern Design"
                        whiteH3="Dashboard"
                        p="Don't worry about the configuration, with our dashboard it's easy to setup and configure the bot."
                        img={dashImg}
                        dash
                        invert
                    />

                    <Feature
                        coloredH3="Report Bugs"
                        whiteH3="& Misfunctions"
                        p="Our bot doesn't have issues because you can report every bug you find, and we will fix it as soon as possible."
                        img={bugsImg}
                    />
                </div>
            </section >

            <section>
                <div className="bg-gradient-dark position-relative m-3 border-radius-xl overflow-hidden">
                    <img src={cardBg} alt="pattern-lines" className="position-absolute start-0 top-md-0 w-100 opacity-2" />
                    <div className="container py-7 postion-relative z-index-2 position-relative">
                        <div className="row">
                            <div className="col-md-7 mx-auto text-center">
                                <h3 className="text-gradient text-primary mb-0">Haven't decided yet?</h3>
                                <h3 className="text-white">Give it a try!</h3>
                                <p className="text-white mb-5">Because if you do, it can be yours for <b>FREE</b>. Moderation, Tickets, Logging, Welcome & Leave, Utility and much, much more... Hit the button below to invite the bot to your server and start making magic happen!</p>
                                <a href="/invite" className="btn btn-primary btn-lg mb-3 mb-sm-0">Invite bot</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}