import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';
import RegistrationModalContextProvider from '../contexts/RegistrationModalContext';
import RegistrationAlertContextProvider from '../contexts/RegistrationAlertContext';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <RegistrationModalContextProvider>
      <RegistrationAlertContextProvider>
        <Component {...pageProps} />
      </RegistrationAlertContextProvider>
    </RegistrationModalContextProvider>
  </Layout>
  );
}

export default MyApp
