import React, { createContext, useState, useMemo } from "react";

export const RegistrationModalContext = createContext(null);

const RegistrationModalContextProvider = (props) => {
    const [registrationModal, setRegistrationModal] = useState(-1);
    const value = useMemo(() => ({ registrationModal, setRegistrationModal }), [registrationModal, setRegistrationModal]);

    return (
        <RegistrationModalContext.Provider value={value}>
            {props.children}
        </RegistrationModalContext.Provider>
    )
}

export default RegistrationModalContextProvider;
