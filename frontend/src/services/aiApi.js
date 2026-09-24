import { handleResponse } from "./api";

export async function getAiInsights() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ai/insights`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
}