import { backend } from "../config.json";
import http from "../util/httpService";

export function signUp(member) {
  return http.post(backend + "signup", member);
}
