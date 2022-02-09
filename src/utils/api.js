const API_BASE_URL = "http://localhost:5000";
const headers = new Headers();

headers.append("Content-Type", "application/json");

// run fetch call using json
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// -----------------------------------------------------------------------------------------------------------------------
// -------USERS-----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

// POST / Register User
export async function registerUser(user, signal) {
  const url = new URL(`${API_BASE_URL}/api/users`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    signal,
  };

  return await fetchJson(url, options, {});
}

// -----------------------------------------------------------------------------------------------------------------------
// -------CATEGORIES------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// GET
// categories list route
export async function listCategories(params, signal) {
  const url = new URL(`${API_BASE_URL}/api/categories`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}

// -----------------------------------------------------------------------------------------------------------------------
// -------ITEMS-----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

// GET
// items list route
export async function listItems(categoryId, signal) {
  const url = new URL(`${API_BASE_URL}/api/categories/${categoryId}/items`);
  return await fetchJson(url, { headers, signal }, []);
}
