export const Feature = ({ coloredH3, whiteH3, p, img, dash, invert }: { coloredH3: string; whiteH3: string; p: string; img: string; dash?: boolean; invert?: boolean }) => {
    return (
        <div className="row mt-6">
            <div className={invert ? "d-md-none d-lg-block col-lg-5" : "d-none"}>
                <img className="w-100 border-radius-lg" src={img} alt="" />
            </div>
            <div className={invert ? "justify-content-lg-end col-12 col-lg-7 my-auto text-lg-end" : "col-12 col-lg-7 my-auto"}>
                <h3 className="text-gradient text-primary mb-0">{coloredH3}</h3>
                <h3>{whiteH3}</h3>
                <p className={invert ? "ps-lg-5 mb-4" : "pe-lg-5 mb-4"}>{p}</p>
                {dash ? (
                    <a href="/login" className="btn btn-primary">Go to dashboard</a>
                ) : (
                    <a href="/invite" className="btn btn-primary">Invite bot now</a>
                )}
            </div>
            <div className={invert ? "col-lg-5 col-12 my-auto d-block d-lg-none" : "col-lg-5 col-12 my-auto"}>
                <img className="w-100 border-radius-lg" src={img} alt="" />
            </div>
        </div>
    )
}