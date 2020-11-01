export const registrationModalReducer = (state, action) => {
    switch(action.type){
        case "SHOW_MODAL":
            return action.id;
        case "DISABLE":
            return -1;
        default:
            return state;
    }
}