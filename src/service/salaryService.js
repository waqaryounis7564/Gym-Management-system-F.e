import { backend } from "../config.json";
import http from "../util/httpService";

export function getSalaries() {
  return http.get(backend + "salary");
}

export function getSalary(id) {
  return http.get(backend + "salary/" + id);
}

export function saveSalary(salary) {
  if (salary._id) {
    const body = { ...salary };
    delete body._id;
    return http.put(backend + "salary/" + salary._id, body);
  }
  return http.post(backend + "salary/", salary);
}

export function deleteSalary(id) {
  return http.delete(backend + "salary/" + id);
}
