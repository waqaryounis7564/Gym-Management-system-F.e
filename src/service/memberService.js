import { backend } from "../config.json";
import http from "../util/httpService";

export function getMembers() {
  return http.get(backend + "member");
}

export function getMember(id) {
  return http.get(backend + "member/" + id);
}

export function saveMember(member) {
  return http.post(backend + "member", {"exercise_id":"5dcd0b46508cc92cbce1f7df",member});
}

export function deleteMember(id) {
  return http.delete(backend + "member/" + id);
}
