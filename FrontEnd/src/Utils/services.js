import axios from "axios";

export const baseUrl = "http://localhost:4200/api/";

export const postAsync = async (url, body) => {
    const resp = await axios.post(baseUrl + url, body)
    return resp.data;
}

export const removeStorage = (key) => {
    localStorage.removeItem(key);
}
export const setStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}
export const getStorage = (key) => {
    try {
        const val = localStorage.getItem(key);
        return JSON.parse(val);
    } catch (error) {
        return null;
    }
}