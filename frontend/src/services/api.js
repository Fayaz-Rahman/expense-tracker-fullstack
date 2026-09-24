export async function handleResponse(response) {

    if (response.ok) {

        if (response.status === 204) {
            return null;
        }

        const contentType =
            response.headers.get("content-type");

        if (
            contentType &&
            contentType.includes("application/json")
        ) {
            return await response.json();
        }

        return await response.text();
    }

    const message = await response.text();

    throw new Error(
        message ||
        `Request failed with status ${response.status}`
    );
}
