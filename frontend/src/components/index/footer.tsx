import logo from "../../assets/img/logo32.ico"

export const Footer = () => <footer className="footer pt-5 mt-5">
    <div className="container">
        <div className=" row">
            <div className="col-md-5 mb-4 ms-auto">
                <div>
                    <a href="https://bot.lambdadev.xyz">
                        <img src={logo} className="mb-3 footer-logo" alt="main_logo" />
                    </a>
                    <h5 className="font-weight-bolder">Lambda Bot</h5>
                    <p className="mb-1 mt-n2"><i>Just epic.</i></p>
                </div>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-4">
                <div>
                    <h6 className="text-sm">Company</h6>
                    <ul className="flex-column ms-n3 nav">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.lambdadev.xyz/" target="_blank" rel="noreferrer">
                                Website
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.lambdadev.xyz/#about" target="_blank" rel="noreferrer">
                                About Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.lambdadev.xyz/#contact" target="_blank" rel="noreferrer">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-4">
                <div>
                    <h6 className="text-sm">Help &amp; Support</h6>
                    <ul className="flex-column ms-n3 nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/support" target="_blank" rel="noreferrer">
                                Join Discord
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/docs" target="_blank" rel="noreferrer">
                                Documentation
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.lambdadev.xyz/#contact" target="_blank" rel="noreferrer">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-4 me-auto">
                <div>
                    <h6 className="text-sm">Legal</h6>
                    <ul className="flex-column ms-n3 nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/terms" target="_blank" rel="noreferrer">
                                Terms &amp; Conditions
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/policy" target="_blank" rel="noreferrer">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-12">
                <div className="text-center">
                    <p className="my-4 text-sm font-weight-normal">
                        All rights reserved. Copyright © <script>
                            document.write(new Date().getFullYear())
                        </script>2022 <a className="text-primary" href="https://monocle.lambdadev.xyz" target="_blank" rel="noreferrer">DrMonocle</a> @ <a className="text-primary" href="https://lambdadev.xyz" target="_blank" rel="noreferrer">Lambda Development</a>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>