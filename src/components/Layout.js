import Footer from './Footer.js'
import Header from './Header.js'

const Layout = props => (
  <div className="body">
    <Header />
    {props.children}
    <Footer />
  </div>
)

export default Layout
