import { BACKEND_URL } from "../constants/constant"

const handleLogin = async (data: any) => {
    const response = await fetch(`${BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const responseData = await response.json();
    return responseData;
}
const handleRegister = async (data: any) => {
    const response = await fetch(`${BACKEND_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const responseData = await response.json();
    return responseData;
}
const handleFetchHotel = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/hotel`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        return await response.json()
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export {
    handleLogin,
    handleRegister,
    handleFetchHotel
}