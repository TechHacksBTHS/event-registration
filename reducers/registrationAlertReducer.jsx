export const registrationAlertReducer = (state, action) => {
    switch(action.type){
        case "SUCCESS":
            return {
                alert: "success",
                content: action.payload
            };
        case "WARNING":
            return {
                alert: "warning",
                content: action.payload
            };
        default:
            return state;
    }
}