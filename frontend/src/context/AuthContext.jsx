import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    function login(userToken) {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const value = {
        token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;