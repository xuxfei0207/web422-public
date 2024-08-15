import { jwtDecode } from "jwt-decode";

export function setToken(token) {
  if (typeof window !== 'undefined') {
    return localStorage.setItem("access_token", token);
  }
  window.localStorage.setItem("access_token", token);
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access_token");
  }
  return window.localStorage.getItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem("access_token");
  }
  window.localStorage.removeItem("access_token");
}

export async function authenticateUser(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 200) {
    console.log("got jwt token: ", data.token);  
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}


export async function registerUser(username, password, password2) {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password, password2: password2 }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 200) {
    console.log("got jwt token: ", data.token);  
    setToken(data.token);
  } else {
    throw new Error(data.message);
  }
}