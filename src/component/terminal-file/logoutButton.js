import {useAuth0} from "@auth0/auth0-react"

function LogoutButton(){

    const {logout} = useAuth0();

    return (
        <button onClick={()=> 
            logout({returnTo: window.location.origin})} className="button-28">Logout</button>
    )
}

export default LogoutButton;