import * as actionTypes from '../actions/actionTypes';
const initialState={
    name:'',
    phone:'',
    email:'',
    address:'',
    companyName:'',
    hasLogged:false,
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.RESET_LOGGED_STATE:
            return{
                initialState
            }
        case actionTypes.SET_LOGGED_NAME:
            return {
                ...state,
                name:action.name
            }
        case actionTypes.SET_LOGGED_EMAIL:
            return{
                ...state,
                email:action.email
            }
        case actionTypes.SET_LOGGED_PHONE:
            return{
                ...state,
                phone:action.phone
            }
        case actionTypes.SET_LOGGED_ADDRESS:
            return{
                ...state,
                address:action.address
            }
        case actionTypes.SET_LOGGED_COMPANY_NAME:
            return{
                 ...state,
                companyName:action.compName
            }
        case actionTypes.SET_LOGGED_STATE:
            return{
                ...state,
                hasLogged:action.Value
            }
    }

    return state;
};

export default reducer;