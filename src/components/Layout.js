import Footer from './Footer'
import Header from './Header'

const Layout = props => (
  <div className="body">
    <Header />
    {props.children}
    <Footer />
  </div>
)

export default Layout
