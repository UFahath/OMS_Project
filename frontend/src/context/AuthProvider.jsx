import { useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("userId")
    });
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem("userRole")
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token")
    });
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const login = (id, role, token) => {
        setIsLoggedIn(true)
        setUserId(id)
        setUserRole(role)
        setToken(token)
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", id)
    }
    const logout = () => {
        setUserId(null)
        setIsLoggedIn(false)
        setUserRole("customer")
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        localStorage.removeItem("userId")
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ userId, isLoggedIn, userRole, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;