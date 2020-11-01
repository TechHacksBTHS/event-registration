import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';
import RegistrationModalContextProvider from '../contexts/RegistrationModalContext';

import fire from '../config/fire-config';

function MyApp({ Component, pageProps }) {
  // console.log(fire.SDK_VERSION);
  return (
  <Layout>
    <RegistrationModalContextProvider>
      <Component {...pageProps} />
    </RegistrationModalContextProvider>
  </Layout>
  );
}

export default MyApp
