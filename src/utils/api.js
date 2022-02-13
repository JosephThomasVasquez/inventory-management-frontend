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

// Add new item to Database
export async function createCategory(category, signal) {
  const url = new URL(`${API_BASE_URL}/api/categories`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: category }),
    signal,
  };
  return await fetchJson(url, options, {});
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

// GET
// items list route
export async function listAllItems(params, signal) {
  const url = new URL(`${API_BASE_URL}/api/items`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}

// GET
// read item byu item ID
export async function readItem(itemId, signal) {
  const url = new URL(`${API_BASE_URL}/api/items/${itemId}`);

  const options = {
    method: "GET",
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

// PUT
// Update item by item ID and submit req.body.data
export async function updateItem(item, signal) {
  const url = new URL(`${API_BASE_URL}/api/items/${item.id}`);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: item }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Add new item to Database
export async function addItem(item, signal) {
  const url = new URL(`${API_BASE_URL}/api/items`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: item }),
    signal,
  };
  return await fetchJson(url, options, {});
}
