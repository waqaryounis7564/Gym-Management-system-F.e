import { backend } from "../config.json";
import http from "../util/httpService";

export function getFees() {
  return http.get(backend + "fee");
}

export function getFee(id) {
  return http.get(backend + "fee/" + id);
}

export function saveFee(fee) {
  if (fee._id) {
    const body = { ...fee };
    delete body._id;
    return http.put(backend + "fee/" + fee._id, body);
  }
  return http.post(backend + "fee/", fee);
}

export function deleteFee(id) {
  return http.delete(backend + "fee/" + id);
}
