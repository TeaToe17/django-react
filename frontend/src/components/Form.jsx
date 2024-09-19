import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN , REFRESH_TOKEN} from "../constants";
import "../styles/form.css"
import Loadingindicator from "./Loadingindicator";

function Form({route, method}) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    
    const name = method === "login" ? "Login" : "Register" ;

    const HandleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password } )
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/Login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={HandleSubmit} className="form-container">
        <h1>{name}</h1> 
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => {setUserName(e.target.value)}}
            placeholder="Username"
            />
        <input
            className="form-input"
            type="text"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="password"
            />
        { loading && <Loadingindicator/> }
        <button className="form-button"  type="submit"> 
            {name}
        </button>
    </form>
    }

    export default Form