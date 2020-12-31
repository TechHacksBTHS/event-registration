import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';

import RegistrationModalContextProvider from '../contexts/RegistrationModalContext';
import RegistrationAlertContextProvider from '../contexts/RegistrationAlertContext';
import AuthContextProvider from '../contexts/AuthContext';

import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

export default MyApp;
