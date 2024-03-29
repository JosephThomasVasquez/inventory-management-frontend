const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL = "http://localhost:5000";

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
    withCredentials: true,
    signal,
  };

  return await fetchJson(url, options, {});
}

// POST / Login User
export async function loginUser(user, signal) {
  // console.log("user", user);
  const url = new URL(`${API_BASE_URL}/api/users/login`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    withCredentials: true,
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

// GET
// read category by category ID
export async function readCategory(categoryId, signal) {
  const url = new URL(`${API_BASE_URL}/api/categories/${categoryId}`);

  const options = {
    method: "GET",
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
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

// PUT
// Update item by item ID and submit req.body.data
export async function updateCategory(category, signal) {
  // console.log("item", item);

  const url = new URL(`${API_BASE_URL}/api/categories/${category.id}`);

  const options = {
    method: "PUT",
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
export async function listItems(categoryId, listType, signal) {
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

export async function searchItems(params, signal) {
  if (params) {
    const url = new URL(`${API_BASE_URL}/api/search`);
    // console.log("params", params);

    const options = {
      method: "GET",
      headers,
      signal,
    };

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
    return await fetchJson(url, options, []);
  }
}

// GET
// read item by item ID
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
  // console.log("item", item);

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

// Add new item to Database
export async function deleteItem(itemId) {
  console.log("api:", itemId);
  const url = new URL(`${API_BASE_URL}/api/items/${itemId}`);

  const options = {
    method: "DELETE",
    headers,
  };

  return await fetchJson(url, options, {});
}
