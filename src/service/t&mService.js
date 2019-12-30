import { backend } from "../config.json";
import http from "../util/httpService";

export function getRegisterServices() {
  return http.get(backend + "registerService");
}

export function getRegisterService(id) {
  return http.get(backend + "registerService/" + id);
}

export function saveRegisterService(registerService) {
  if (registerService._id) {
    const body = { ...registerService };
    delete body._id;
    return http.put(backend + "registerService/" + registerService._id, body);
  }
  return http.post(backend + "registerService/", registerService);
}

export function deleteRegisterService(id) {
  return http.delete(backend + "registerService/" + id);
}
