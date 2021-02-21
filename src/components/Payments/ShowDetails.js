import { useEffect } from "react";

const ShowDetails = (props) => {
    useEffect(()=>{
        console.log(props.data)
    },[])
    return(
        <div>
           Payment Option: {props.data.paymentOption}
        </div>
    )
}
export default ShowDetails;