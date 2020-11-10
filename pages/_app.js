import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';
import RegistrationModalContextProvider from '../contexts/RegistrationModalContext';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <RegistrationModalContextProvider>
      <Component {...pageProps} />
    </RegistrationModalContextProvider>
  </Layout>
  );
}

export default MyApp
