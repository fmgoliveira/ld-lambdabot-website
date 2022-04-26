import { Navbar, Hero, Card, Footer } from "../components/index/index"
import { User } from "../utils/typings/User"

export const IndexPage = ({ user }: { user: User | undefined }) => <div>
    <Navbar user={user} />
    <Hero />
    <Card />
    <Footer />
</div>