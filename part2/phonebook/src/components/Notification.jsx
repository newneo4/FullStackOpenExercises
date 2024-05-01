/* eslint-disable react/prop-types */
const Notification = ({message, messageColor}) =>{

    const style = {
        fontSize: "20px",
        background: "lightgrey",
        width : "400px",
        borderRadius : "10px",
        borderStyle : "solid",
        marginBottom : "5px",
        textAlign : "center",
        padding : "4px"
    }

    const green = {
        borderColor : "green",
        color: "green"
    }

    const red = {
        borderColor : "red",
        color: "red"
    }

    if (message == null){
        return null
    }

    return(
        <div style={
            messageColor === "green"
            ? {...style,...green}
            : {...style,...red}       
        }>
            {message}
        </div>
    )
}

export default Notification