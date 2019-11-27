import { backend } from "../config.json";
import http from "../util/httpService";

export function getTrainers() {
  return http.get(backend + "trainer");
}

export function getTrainer(id) {
  return http.get(backend + "trainer/" + id);
}

// export function savetrainer(trainer) {
//   let trainerInDb = trainers.find(m => m._id === trainer._id) || {};
//   trainerInDb.name = trainer.name;
//   trainerInDb.genre = genresAPI.genres.find(g => g._id === trainer.genreId);
//   trainerInDb.numberInStock = trainer.numberInStock;
//   trainerInDb.dailyRentalRate = trainer.dailyRentalRate;

//   if (!trainerInDb._id) {
//     trainerInDb._id = Date.now();
//     mrainers.push(trainerInDb);
//   }

//   return trainerInDb;
// }

export function deletetrainer(id) {
  return http.delete(backend + "trainer/" + id);
}
