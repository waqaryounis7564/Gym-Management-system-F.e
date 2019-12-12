import { backend } from "../config.json";
import http from "../util/httpService";

export function getExercises() {
  return http.get(backend + "exercise");
}

export function getExercise(id) {
  return http.get(backend + "exercise/" + id);
}

export function saveExercise(exercise) {
  if (exercise._id) {
    const body = { ...exercise };
    delete body._id;
    return http.put(backend + "exercise/" + exercise._id, body);
  }
  return http.post(backend + "exercise/", exercise);
}

export function deleteExercise(id) {
  return http.delete(backend + "exercise/" + id);
}
