// src/utils/api.js
export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // Optionally, check for non-OK status
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in apiPost:", error);
    throw error;
  }
};
