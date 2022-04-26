import { useState } from "react"

export const Spinner = () => {
  const [showInfo, setShowInfo] = useState(false)
  const [showInfo2, setShowInfo2] = useState(false)
  const [showInfo3, setShowInfo3] = useState(false)

  setTimeout(() => {
    setShowInfo(true)
  }, 3000)

  setTimeout(() => {
    setShowInfo2(true)
  }, 4500)

  setTimeout(() => {
    setShowInfo3(true)
  }, 6000)

  return (
    <>
      <div className="container-fluid vh-100 z-index-3 bg-cover opacity-8">
        <div className="row h-100">
          <div className="col d-flex flex-column justify-content-center align-items-center gap-2">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="text-md text-center">
              Loading...
            </div>
          </div>
        </div>
      </div>
      {
        showInfo ?
          <div className="position-fixed bottom-4 w-100">
            <div className="text-xs text-center mx-auto">
              <span>If this takes too long, wait some minutes and refresh the page.</span>
              {
                showInfo2 ?
                  <>
                    <br />
                    <span>If it keeps taking too long, go back to the previous page and return.</span>
                  </> : null
              }
              {
                showInfo3 ?
                  <>
                    <br />
                    <span>If it still keeps taking too long, well, <a href="/support" target='_blank' className="link-warning">contact us</a>.</span>
                  </> : null
              }
            </div>
          </div> : null
      }
    </>
  )
}