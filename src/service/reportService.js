import { backend } from "../config.json";
import http from "../util/httpService";

export function getReports() {
  return http.get(backend + "report");
}

// export function getPhysicalRecord(id) {
//   return http.get(backend + "physicalRecord/" + id);
// }

// export function savePhysicalRecord(physicalRecord) {
//   if (physicalRecord._id) {
//     const body = { ...physicalRecord };
//     delete body._id;
//     return http.put(backend + "physicalRecord/" + physicalRecord._id, body);
//   }
//   return http.post(backend + "physicalRecord/", physicalRecord);
// }

// export function deletePhysicalRecord(id) {
//   return http.delete(backend + "physicalRecord/" + id);
// }
