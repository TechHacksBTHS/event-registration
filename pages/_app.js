import Layout from '../components/Layout';
import '../styles/globals.css';
import '../components/Layout';
import { RegistrationModalContext } from '../contexts/RegistrationModalContext';
import { useMemo, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [registrationModal, setRegistrationModal] = useState(-1);
  const value = useMemo(() => ({ registrationModal, setRegistrationModal }), [registrationModal, setRegistrationModal]);

  return (
  <Layout>
    <RegistrationModalContext.Provider value={value}>
      <Component {...pageProps} />
    </RegistrationModalContext.Provider>
  </Layout>);
}

export default MyApp
