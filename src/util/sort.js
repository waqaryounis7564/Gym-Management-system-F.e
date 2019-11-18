export default function(movies, genre) {
  return movies.filter(m => m.genre.name === genre);
}
