import React from 'react';
import { useHistory } from "react-router-dom";

export default function AuthButton(props) {
    let history = useHistory();
    // const user = JSON.parse(localStorage.getItem('usuario'));
    
    const signout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        props.fnSetIsLogged(false);
        history.push("/");
    }

    return props.isLogged ?(
        <div style={{ backgroundColor:'green' , width:'60%' , height:'20px' , margin:'auto' }} >
            <button onClick={signout} >Sing out</button>
        </div>
    ) :(
        <span>You are not logged in.</span>
    )
}
