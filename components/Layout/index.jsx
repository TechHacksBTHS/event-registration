import Nav from './Nav';
import Head from 'next/head';

const Layout = ({ children }) => (
    <div className="overflow-x-hidden">
      <Head>
        <title>TechHacks - Register</title>
      </Head>
      
      <Nav />
        { children }
    </div>
  )
  
  export default Layout;