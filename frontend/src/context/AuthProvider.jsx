import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null)
    const login = (id, role)=>{
        setIsLoggedIn(true)
        setUserId(id)
        setUserRole(role)
    }
    const logout = ()=>{
        setUserId(null)
        setIsLoggedIn(false)
        setUserRole(null)
    }

    return (
        <AuthContext.Provider value = {{ userId, isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;