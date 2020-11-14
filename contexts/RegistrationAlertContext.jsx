import { registrationAlertReducer } from "../reducers/registrationAlertReducer";
import { createContext, useReducer, useMemo } from "react";

export const RegistrationAlertContext = createContext(null);

const RegistrationAlertContextProvider = (props) => {
    const [registrationAlert, dispatch] = useReducer(registrationAlertReducer, null);
    const value = useMemo(() => ({ registrationAlert, dispatch }), [registrationAlert, dispatch]);

    return (
        <RegistrationAlertContext.Provider value={value}>
            {props.children}
        </RegistrationAlertContext.Provider>
    )
}

export default RegistrationAlertContextProvider;