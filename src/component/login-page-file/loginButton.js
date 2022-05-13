import {useAuth0} from "@auth0/auth0-react"

function LoginButton(){

    const {loginWithRedirect} = useAuth0();

    return (
        <button onClick={()=> loginWithRedirect()} className="button-36">Login</button>
    )
}

export default LoginButton;