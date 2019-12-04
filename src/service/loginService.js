import { backend } from "../config.json";
import http from "../util/httpService";

export function signIn(email, password) {
  return http.post(backend + "signin", { email, password });
}
