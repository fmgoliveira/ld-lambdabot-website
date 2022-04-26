import { Navbar, Footer } from "../components/servers";
import { GuildItem } from "../components/servers";
import { Spinner } from "../components/spinner";
import { useFetchGuilds } from "../utils/hooks/useFetchGuilds";
import { PartialGuild } from "../utils/typings/Guild";
import { User } from "../utils/typings/User";

export const ServersPage = ({ user }: { user: User }) => {
    const { guilds, error, loading } = useFetchGuilds()
    if (loading) return <Spinner />

    if (error) {
        window.location.replace('/401')
        return <Spinner />
    }

    return <div>
        <Navbar user={user} />
        <div className="container">
            <section className="container mt-8 min-vh-80">
                <div className="row">
                    <div className="col text-center">
                        <h3>Select a Server</h3>
                    </div>
                </div>

                <div className="row mt-4">
                    {
                        guilds ?
                            <>
                                {guilds.filter((guild: PartialGuild) => guild.botIn).map((guild: PartialGuild) => (<GuildItem guild={guild} />))}
                                {guilds.filter((guild: PartialGuild) => !guild.botIn).map((guild: PartialGuild) => (<GuildItem guild={guild} />))}
                            </> :
                            <>
                                <div className="col-12">
                                    <div className="alert alert-warning text-white text-center" role="alert">
                                        There are no guilds you can manage. You need the <code className="text-white">ADMINISTRATOR</code>, <code className="text-white">SERVER MANAGER</code> permissions, or be the owner of the server.
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </section>
            <Footer />
        </div>
    </div>
}