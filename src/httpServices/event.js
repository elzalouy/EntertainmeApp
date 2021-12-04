import http from "./httpHandler";
import _try from "../utils/try";
import handleServerError from "./handleServerError";
import { APIUrl } from "./http.json";
import { getItem } from "../utils/StorageHandler";
const route = APIUrl + "/api/";

export const requestOrder = _try(async (data) => {
  let token, headers;
  token = await getItem("x-auth-token");
  if (token) headers = { Authorization: `Bearer ${token}` };
  const response = await http.post(route + "order", data, {
    headers: headers,
  });
  const result = handleServerError(response);
  if (result) return { error: "Network not estalished!" };
  if (response.data) return { error: null, data: response.data };
  return {
    error:
      response.response.data.errors[
        Object.keys(response.response.data.errors)[0]
      ][0],
    data: null,
  };
});

export const updateOrder = _try(async (id, data) => {
  let token, headers;
  token = await getItem("x-auth-token");
  if (token) headers = { Authorization: `Bearer ${token}` };
  let response = await http.put(route + `order/${id}`, data, {
    headers: headers,
  });
  if (response.response) {
    return {
      data: null,
      error: response.response.data.errors[Object.keys[0]][0],
    };
  }
  return { data: response.data, error: null };
});

export const getEventsByUser = async () => {
  const token = await getItem("x-auth-token");
  let response = await http.get(route + "order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 200) return { data: response.data, error: null };
  else return { data: null, error: response.response.data };
};
