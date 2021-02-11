import * as actionTypes from '../actions/actionTypes';
const initialState={
    name:'Prashant',
    pickupAddress:'',
    pickupPin:'',
    destinationAddress:'',
    destinationPin:'',
    height:'',
    width:'',
    length:'',
    noOfUnits:'',
    weightPerUnit:'',
    unit:'',
    phone:'6350108758',
    email:'prashantkumarsingh9423@gmail.com',
    companyName:'GoFlexe',
    pickupDate:'',
    deliveryDate:'',
    pickupSlot:'',
    additionalNote:'',
    measureable:true,
    totalWeight:'',
    density:'',
    chosenProducts:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.RESET_STATE:
            return{
                initialState
            }
        case actionTypes.SET_NAME:
            return {
                ...state,
                name:action.name
            }
        case actionTypes.SET_PICKUP_ADDRESS:
            return{
                ...state,
                pickupAddress:action.pickupaddress
            }
        case actionTypes.SET_PICKUP_PIN:
            return{
                ...state,
                pickupPin:action.pickupPin
            }
        case actionTypes.SET_DESTINATION_ADDRESS:
            return{
                ...state,
                destinationAddress:action.destinationaddress
            }
        case actionTypes.SET_DESTINATION_PIN:
            return{
                ...state,
                destinationPin:action.destinationpin
            }
        case actionTypes.SET_HEIGHT:
            return{
                ...state,
                height:action.height
            }
        
        case actionTypes.SET_WIDTH:
            return{
                ...state,
                width:action.width
            }
        case actionTypes.SET_LENGTH:
                return{
                    ...state,
                    length:action.length
                }
        case actionTypes.SET_UNIT:
            return{
                ...state,
                unit:action.unit
            }
        case actionTypes.SET_NUMBER_OF_UNITS:
                return{
                    ...state,
                    noOfUnits:action.noOfUnits
                }

        case actionTypes.SET_WEIGHT_PER_UNIT:
                return{
                        ...state,
                        weightPerUnit:action.weightPerUnit
                }
        case actionTypes.SET_PHONE:
                    return{
                            ...state,
                            phone:action.phone
                    }
        case actionTypes.SET_EMAIL:
                        return{
                                ...state,
                                email:action.email
                        }
        case actionTypes.SET_COMPANY_NAME:
                            return{
                                    ...state,
                                    companyName:action.compName
                            }
        case actionTypes.SET_PICKUP_DATE:
            return{
                ...state,
                pickupDate:action.pickupDate
            }
        case actionTypes.SET_DELIVERY_DATE:
            return{
                ...state,
                deliveryDate:action.deliveryDate
            }
        case actionTypes.SET_PICKUP_SLOT:
            return{
                ...state,
                pickupSlot:action.pickupSlot
            }
        case actionTypes.SET_ADDITIONAL_NOTE:
            return{
                ...state,
                additionalNote:action.additionalNote
            }
        case actionTypes.SET_MEASUREABLE:
                return{
                    ...state,
                    measureable:action.isMeasureable
                }
        case actionTypes.SET_TOTAL_WEIGHT:
            return{
                ...state,
                totalWeight:action.totalWeight
            }
        case actionTypes.SET_DENSITY:
            return{
                ...state,
                density:action.density
            }
        case actionTypes.SET_CHOSEN_PRODUCTS:
            return{
                ...state,
                chosenProducts:action.chosenProducts
            }
    }

    return state;
};

export default reducer;