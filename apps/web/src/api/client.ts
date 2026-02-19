const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;

    try {
      const body = await res.json();
      message = body.error || body.message || message;
    } catch {
      // ignore JSON parse errors
    }

    // Optional: handle expired auth
    if (res.status === 401) {
      localStorage.removeItem("token");
    }

    throw new Error(message);
  }

  // Handle empty responses (204 etc.)
  if (res.status === 204) {
    return {} as T;
  }

  return res.json() as Promise<T>;
}
