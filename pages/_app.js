import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';
import RegistrationModalContextProvider from '../contexts/RegistrationModalContext';
import RegistrationAlertContextProvider from '../contexts/RegistrationAlertContext';
import AuthContextProvider from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <RegistrationModalContextProvider>
          <RegistrationAlertContextProvider>
            <Component {...pageProps} />
          </RegistrationAlertContextProvider>
        </RegistrationModalContextProvider>
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp
