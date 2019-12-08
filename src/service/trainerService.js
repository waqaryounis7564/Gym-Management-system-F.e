import { backend } from "../config.json";
import http from "../util/httpService";

export function getTrainers() {
  return http.get(backend + "trainer");
}

export function getTrainer(id) {
  return http.get(backend + "trainer/" + id);
}

export function saveTrainer(trainer) {
  if (trainer._id) {
    const body = { ...trainer };
    delete body._id;
    return http.put(backend + "trainer/" + trainer._id, body);
  }
  return http.post(backend + "trainer/", trainer);
}

export function deleteTrainer(id) {
  return http.delete(backend + "trainer/" + id);
}
