"use strict";
//A mock auth provider for now (later hook into backend JWT).
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
const react_1 = require("react");
function useAuth() {
    const [user, setUser] = (0, react_1.useState)(JSON.parse(localStorage.getItem("user") || "null"));
    const login = (username, _password) => {
        const loggedInUser = { username };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return { user, login, logout };
}
