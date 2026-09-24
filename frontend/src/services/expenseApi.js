import { handleResponse } from "./api";

const API_URL =
    `${import.meta.env.VITE_API_URL}/api/expenses`;

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

export async function getExpenses(token) {

    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(token)
    });

    return await handleResponse(response);
}

export async function createExpense(
    token,
    expense
) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(expense)
    });

    return await handleResponse(response);
}

export async function updateExpense(
    token,
    id,
    expense
) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(token),
            body: JSON.stringify(expense)
        }
    );

    return await handleResponse(response);
}

export async function deleteExpense(
    token,
    id
) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(token)
        }
    );

    return await handleResponse(response);
}