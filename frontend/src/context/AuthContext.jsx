import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(
        !!localStorage.getItem(ACCESS_TOKEN)  
    )

    const navigate = useNavigate();

    useEffect(() => {
        authenticateUser().catch(() => setIsAuth(false));
    }, []);

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);

        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if(res.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuth(true);
            }
            else{
                setIsAuth(false)
            }
        }catch(error){
            console.log(error);
            setIsAuth(false);
        }
    }

    const authenticateUser = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token) return setIsAuth(false);

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if(tokenExpiration < now){
            await refreshToken();
        } else{
            setIsAuth(true)
        }
    }

    const login = (access, refresh) => {
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        setIsAuth(true);
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuth(false);
        navigate("/login");
    }

    return(
        <AuthContext.Provider value = {{isAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
