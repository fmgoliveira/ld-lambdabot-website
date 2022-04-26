// Modules
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

// Pages
import { IndexPage } from './pages/IndexPage'
import { ServersPage } from './pages/ServersPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from "./pages/NotFoundPage"
import { ForbiddenPage } from "./pages/ForbiddenPage"

// Contexts
import { GuildContext } from "./utils/contexts/GuildContext"

// Utils & Components
import { useFetchUser } from "./utils/hooks/useFetchUser"
import { Cmds, Docs, Invite, Login, Logout, Policy, RedirectToServers, RedirectToIndex, Support, Terms } from "./utils/redirects"
import { Spinner } from "./components/spinner"
import { InviteContext } from "./utils/contexts/InviteContext"
import { InsightsDashboardPage } from "./pages/InsightsDashboardPage"
import { InternalServerErrorPage } from "./pages/InternalServerErrorPage"
import { InsightsMembersPage } from "./pages/InsightsMembersPage"
import { InsightsActionsPage } from "./pages/InsightsActionsPage"
import { ManageAdministrationPage } from "./pages/ManageAdministrationPage"
import { ReactNotifications } from "react-notifications-component"
import { ManageWelcomePage } from "./pages/ManageWelcomePage"
import { ManageTicketsPage } from "./pages/ManageTicketsPage"
import { ManageModerationPage } from "./pages/ManageModerationPage"
import { ManageLoggingPage } from "./pages/ManageLoggingPage"
import { ManageVerificationPage } from "./pages/ManageVerificationPage"
import { ManageLevelsPage } from "./pages/ManageLevelsPage"


// Function App()
function App() {
  const [guildId, setGuildId] = useState("")
  const [url, setUrl] = useState("")
  const { user, error, loading } = useFetchUser()
  if (loading) return <Spinner />

  return (
    <GuildContext.Provider value={{ guildId, setGuildId }} >
      <InviteContext.Provider value={{ url, setUrl }} >
        <ReactNotifications />
        <Routes>
          <Route path="/" element={<IndexPage user={user} />} />

          <Route path="/invite" element={< Invite guildId={guildId} redirectUrl={url} />} />
          <Route path="/docs" element={< Docs />} />
          <Route path="/support" element={< Support />} />
          <Route path="/commands" element={< Cmds />} />
          <Route path="/terms" element={< Terms />} />
          <Route path="/policy" element={< Policy />} />

          <Route path="/login" element={user ? <RedirectToServers /> : !error ? <Login /> : <InternalServerErrorPage />} />
          <Route path="/logout" element={user ? <RedirectToIndex /> : !error ? <Logout /> : <InternalServerErrorPage />} />
          <Route path="/servers" element={user ? <ServersPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />

          <Route path="/insights/dashboard" element={user ? <InsightsDashboardPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/insights/members" element={user ? <InsightsMembersPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/insights/logs" element={user ? <InsightsActionsPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />

          <Route path="/manage/settings" element={user ? <ManageAdministrationPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/welcome" element={user ? <ManageWelcomePage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/tickets" element={user ? <ManageTicketsPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/moderation" element={user ? <ManageModerationPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/logging" element={user ? <ManageLoggingPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/verification" element={user ? <ManageVerificationPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />
          <Route path="/manage/levels" element={user ? <ManageLevelsPage user={user} /> : !error ? <ForbiddenPage /> : <InternalServerErrorPage />} />

          <Route path="/401" element={<ForbiddenPage />} />
          <Route path="/404" element={<NotFoundPage user={user} />} />
          <Route path="/500" element={<InternalServerErrorPage />} />

          <Route path="*" element={<NotFoundPage user={user} />} />
        </Routes>
      </InviteContext.Provider>
    </GuildContext.Provider>
  )
}

export default App