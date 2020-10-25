import Nav from './Nav';

const Layout = ({ children }) => (
    <div className="overflow-x-hidden">
      <Nav />
        { children }
    </div>
  )
  
  export default Layout;