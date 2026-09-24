import { handleResponse } from "./api";

export async function getBudget(token) {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/budget`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
}


export async function saveBudget(token, amount) {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/budget`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount
            })
        }
    );

    return await handleResponse(response);
}