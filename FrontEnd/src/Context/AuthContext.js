import { createContext, useCallback, useEffect, useState } from "react";
import { getStorage, postAsync, removeStorage, setStorage } from "../Utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userLogin, setUserLogin] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState({});
    const [userRegister, setUserRegister] = useState({});
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState({});
    const [phoneVerify, setPhoneVerify] = useState({});
    const [isPhoneVerifyLoading, setIsPhoneVerifyLoading] = useState(false);
    const [isStepVerifyCode, setIsStepVerifyCode] = useState(false);

    useEffect(() => {
        const user = getStorage("user");
        setUser(user);
    }, []);

    const updateUserLogin = useCallback((info) => {
        setUserLogin(info);
    }, []);

    const login = useCallback(async (e, handleSubmit) => {
        e?.preventDefault();
        setIsLoginLoading(true);
        const resp = await postAsync("auth/login", userLogin)
        setIsLoginLoading(false);
        setStorage("user", resp);
        setUser(resp);
        handleSubmit();
    }, [userLogin]);

    const updateUserRegister = useCallback((info) => {
        setUserRegister(info);
    }, []);
    const updatePhoneVerify = useCallback((info) => {
        setPhoneVerify(info);
    }, []);

    const sendPhoneAccessCode = useCallback(async (e) => {
        e?.preventDefault();
        setIsPhoneVerifyLoading(true);
        const resp = await postAsync("auth/createnewaccesscode", phoneVerify)
        setIsPhoneVerifyLoading(false);
        setIsStepVerifyCode(true);
    }, [phoneVerify]);

    const validatePhoneAccessCode = useCallback(async (e, handleSubmit) => {
        e?.preventDefault();
        setIsPhoneVerifyLoading(true);
        // phoneVerify.accessCode = Number(phoneVerify.accessCode);
        const resp = await postAsync("auth/validateaccesscode", phoneVerify)
        setIsPhoneVerifyLoading(false);
        console.log(resp);
        if (resp?.success)
            setStorage("user", resp.user);
        handleSubmit();
    }, [phoneVerify]);

    const register = useCallback(async (e) => {
        e?.preventDefault();
        setIsRegisterLoading(true);
        const resp = await postAsync("auth/register", userRegister)
        setIsRegisterLoading(false);
    }, [userRegister]);

    const logout = useCallback(() => {
        removeStorage("user");
        setUser(null);
    }, []);

    return <AuthContext.Provider
        value={{
            user,
            userRegister,
            updateUserRegister,
            register,
            registerError,
            userLogin,
            updateUserLogin,
            login,
            loginError,
            logout,
            updatePhoneVerify,
            sendPhoneAccessCode,
            validatePhoneAccessCode,
            isStepVerifyCode
        }}
    >
        {children}
    </AuthContext.Provider>
}