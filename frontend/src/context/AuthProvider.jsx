import { useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("customer");
    const [token, setToken] = useState(null);
    const login = (id, role, token)=>{
        setIsLoggedIn(true)
        setUserId(id)
        setUserRole(role)
        setToken(token)
    }
    const logout = ()=>{
        setUserId(null)
        setIsLoggedIn(false)
        setUserRole("customer")
        setToken(null)
        navigate('/')
    }

    return (
        <AuthContext.Provider value = {{ userId, isLoggedIn, userRole, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;