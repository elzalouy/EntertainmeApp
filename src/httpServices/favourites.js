import http from "./httpHandler";
import _try from "../utils/try";
import { APIUrl } from "./http.json";
import { getItem } from "../utils/StorageHandler";
import handleServerError from "./handleServerError";
const route = APIUrl + "/api/favourites";
export const getFavourites = async () => {
  let headers;
  let token = await getItem("x-auth-token");
  if (token) headers = { Authorization: `Bearer ${token}` };
  const response = await http.get(route, { headers: headers });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  else {
    if (response?.response?.status === 401)
      return { data: null, error: response.response.data.message };
    else return { data: response.data, error: null };
  }
};
export const setFavourite = async (artist) => {
  let headers;
  let token = await getItem("x-auth-token");
  if (token) headers = { Authorization: `Bearer ${token}` };
  const response = await http.post(
    route,
    { artist_id: artist },
    { headers: headers }
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  else {
    if (response?.response?.status === 401)
      return { data: null, error: response.response.data.message };
    else return { data: response.data, error: null };
  }
};

export const removeFavourite = async (artist) => {
  let headers;
  let token = await getItem("x-auth-token");
  if (token) headers = { Authorization: `Bearer ${token}` };
  const response = await http.delete(route, {
    headers: headers,
    data: { artist_id: artist },
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  else {
    if (response?.response?.status === 401)
      return { data: null, error: response.response.data.message };
    else return { data: response.data, error: null };
  }
};
