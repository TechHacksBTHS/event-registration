export const registrationModalReducer = (state, action) => {
    switch(action.type){
        case "SHOW_MODAL":
            // console.log(action.payload);
            return action.payload;
        case "DISABLE":
            return -1;
        default:
            return state;
    }
}