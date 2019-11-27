import { backend } from "../config.json";
import http from "../util/httpService";

export function getMembers() {
  return http.get(backend + "member");
}

export function getMember(id) {
  return http.get(backend + "member/" + id);
}

// export function savemember(member) {
//   let memberInDb = members.find(m => m._id === member._id) || {};
//   memberInDb.name = member.name;
//   memberInDb.genre = genresAPI.genres.find(g => g._id === member.genreId);
//   memberInDb.numberInStock = member.numberInStock;
//   memberInDb.dailyRentalRate = member.dailyRentalRate;

//   if (!memberInDb._id) {
//     memberInDb._id = Date.now();
//     members.push(memberInDb);
//   }

//   return memberInDb;
// }

export function deleteMember(id) {
  return http.delete(backend + "member/" + id);
}
