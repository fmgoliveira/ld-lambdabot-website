export const Hero = () => {
    return (
        <div className="page-header min-vh-75 relative" style={{ "backgroundImage": "url('../img/hero_bg.jpg'", "backgroundSize": "" }}>
            <span className="mask bg-gradient-primary opacity-4"></span>

            <div className="container">
                <div className="row">
                    <div className="col-lg-7 text-center mx-auto">
                        <h1 className="text-white pt-3 mt-n5">Lambda Bot</h1>
                        <p className="lead text-white mt-3">
                            A user-friendly discord bot that offers you moderation, tickets and more...
                            <br />
                            Made <b>by you</b>, <b>for you</b>. <i>Just epic</i>
                        </p>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm d-sm-flex justify-content-end">
                                    <a className="btn btn-icon btn-white" href="#features">
                                        <div className="d-flex align-items-center">
                                            Read more
                                            <i className="material-icons ms-2" aria-hidden="true">arrow_downward</i>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-12 col-sm d-sm-flex justify-content-start">
                                    <a className="btn btn-icon btn-primary" href="/login">
                                        <div className="d-flex align-items-center">
                                            Dashboard
                                            <i className="material-icons ms-2" aria-hidden="true">login</i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}