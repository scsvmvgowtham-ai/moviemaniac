// ================= DIRECTOR DETAILS PAGE - director-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const directorId = params.get("id");
  const container = document.getElementById("directorDetails");

  if (!directorId || !container) return;

  const director = window.getDirector(directorId);

  if (!director) {
    container.innerHTML = "<h2>Director not found</h2>";
    return;
  }

  // Get movies by this director
  const movies = window.getMoviesByDirector(directorId);

  // Build HTML
  let html = `
    <h2>${director.name}</h2>
    <img src="${director.photo}" class="details-poster" alt="${director.name}">
    <h3>🎬 Movies</h3>
  `;

  if (movies.length === 0) {
    html += `<p>No movies available yet.</p>`;
  } else {
    html += `<div class="movie-grid">`;
    
    movies.forEach(movie => {
      html += `
        <div class="movie-card" onclick="window.location.href='movie-details.html?id=${movie.id}'">
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.year} • ${movie.genre}</p>
        </div>
      `;
    });
    
    html += `</div>`;
  }

  container.innerHTML = html;
});