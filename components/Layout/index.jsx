import Nav from './Nav';
import Head from 'next/head';

const Layout = ({ children }) => (
    <div className="overflow-x-hidden">
      <Head>
        <title>TechHacks - Register</title>
        <link rel="stylesheet" type="text/css" href="css/nprogress.css" />
      </Head>
      
      <Nav />
        { children }
    </div>
  )
  
  export default Layout;