import { backend } from "../config.json";
import http from "../util/httpService";

export function getEquipments() {
  return http.get(backend + "equipment");
}

export function getEquipment(id) {
  return http.get(backend + "equipment/" + id);
}

export function saveEquipment(equipment) {
  if (equipment._id) {
    const body = { ...equipment };
    delete body._id;
    return http.put(backend + "equipment/" + equipment._id, body);
  }
  return http.post(backend + "equipment/", equipment);
}

export function deleteEquipment(id) {
  return http.delete(backend + "equipment/" + id);
}
