import http from "./httpHandler";
import _try from "../utils/try";
import { APIUrl } from "./http.json";
import handleServerError from "./handleServerError";
const route = APIUrl + "/api/";

export const getFeaturedArtists = _try(async () => {
  const response = await http.get(route + "featured");
  if (response.status === 200) {
    return response.data.artists;
  }
  return null;
});

export const getArtist = _try(async (id) => {
  const response = await http.get(route + "artists/" + id);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
});
export const getArtists = _try(async (artists_ids) => {
  const response = await http.post(route + "artists/ids", { artists_ids });
  const result = handleServerError(response);
  if (result) return { data: null, error: resul };
  return { data: response.data.artists, error: null };
});
