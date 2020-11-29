import React, { createContext, useMemo, useReducer } from "react";
import { registrationModalReducer } from "../reducers/registrationModalReducer";

export const RegistrationModalContext = createContext(null);

const RegistrationModalContextProvider = (props) => {
    const [registrationModal, dispatch] = useReducer(registrationModalReducer, -1);
    const value = useMemo(() => ({ registrationModal, dispatch }), [registrationModal, dispatch]);

    return (
        <RegistrationModalContext.Provider value={value}>
            {props.children}
        </RegistrationModalContext.Provider>
    )
}

export default RegistrationModalContextProvider;
