import * as actionTypes from './actionTypes';


export const resetLoginState=()=>{
    return{
        type:actionTypes.RESET_LOGGED_STATE
    }
}

export const setLoggedName=(name)=>{
    return{
        type:actionTypes.SET_LOGGED_NAME,
        name:name
    };
};

export const setLoggedPhone=(phone)=>{
    return{
        type:actionTypes.SET_LOGGED_PHONE,
        phone:phone
    };
};


export const setLoggedEmail=(email)=>{
    return{
        type:actionTypes.SET_LOGGED_EMAIL,
        email:email
    };
};

export const setLoggedCompanyName=(compName)=>{
    return{
        type:actionTypes.SET_LOGGED_COMPANY_NAME,
        companyName:compName
    };
};

export const setLoggedAddress=(address)=>{
    return{
        type:actionTypes.SET_LOGGED_ADDRESS,
        address:address
    };
};

export const setLoggedState=(Value) => {
    return{
        type:actionTypes.SET_LOGGED_STATE,
        Value:Value
    };
}

