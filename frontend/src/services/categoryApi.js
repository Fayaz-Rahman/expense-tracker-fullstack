import { handleResponse } from "./api";

export async function getCategories(token) {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
}


export async function createCategory(token, name) {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        }
    );

    return await handleResponse(response);
}