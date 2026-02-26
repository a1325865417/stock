const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function fetchJson(path, options = {}) {
  const url = API_BASE ? `${API_BASE}${path}` : path;
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}
