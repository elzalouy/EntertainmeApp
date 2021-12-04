import http from "./httpHandler";
import _try from "../utils/try";
import { APIUrl } from "./http.json";
const route = APIUrl + "/api/";

export const getCategories = _try(async () => {
  const response = await http.get(route + "categories");
  if (response.status === 200) {
    return response.data;
  }
});
export const getCategory = _try(async (id, page) => {
  const response = await http.get(route + "categories/" + id + "?Page:" + page);
  if (response.status === 200) {
    return response.data;
  } else return null;
});
export const search = _try(async (query) => {
  const response = await http.get(route + "search?query=" + query);
  if (response.status === 200) {
    return response.data;
  } else return null;
});
