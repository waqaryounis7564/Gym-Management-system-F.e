import { backend } from "../config.json";
import http from "../util/httpService";

export function getMembers() {
  return http.get(backend + "member");
}

export function getMember(id) {
  return http.get(backend + "member/" + id);
}

export function saveMember(member) {
  if (member._id) {
    const body = { ...member };
    delete body._id;
    return http.put(backend + "member/" + member._id, body);
  }
  return http.post(backend + "member/", member);
}

export function deleteMember(id) {
  return http.delete(backend + "member/" + id);
}
