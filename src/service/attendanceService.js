import { backend } from "../config.json";
import http from "../util/httpService";

export function getAttendances() {
  return http.get(backend + "attendance");
}

export function getAttendance(id) {
  return http.get(backend + "attendance/" + id);
}

export function saveAttendance(attendance) {
  if (attendance._id) {
    const body = { ...attendance };
    delete body._id;
    return http.put(backend + "attendance/" + attendance._id, body);
  }
  return http.post(backend + "attendance/", attendance);
}

export function deleteAttendance(id) {
  return http.delete(backend + "attendance/" + id);
}
export function UpdateAttendance(id) {
  return http.put(backend + "attendance/" + id);
}
