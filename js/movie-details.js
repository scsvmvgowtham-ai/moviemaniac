// ================= MOVIE DETAILS PAGE - movie-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  const container = document.getElementById("movieDetails");

  if (!movieId || !container) return;

  const movie = window.getMovie(movieId);

  if (!movie) {
    container.innerHTML = "<h2>Movie not found</h2>";
    return;
  }

  // Get director
  const director = window.getDirector(movie.directorId);

  // Build movie details HTML
  let html = `
    <div class="details-header">
      <img src="${movie.poster}" alt="${movie.title}" class="details-poster">
      <div class="details-info">
        <h1>${movie.title}</h1>
        <div class="meta">
          <span>📅 ${movie.year}</span>
          <span>🎭 ${movie.genre}</span>
          <span>🎬 ${movie.industry}</span>
        </div>
        <p class="description">${movie.description}</p>
        ${movie.trailer ? `<a href="${movie.trailer}" target="_blank" class="trailer-btn">▶️ Watch Trailer</a>` : ''}
      </div>
    </div>
  `;

  // Director Section
  if (director) {
    html += `
      <div class="cast-section">
        <h2>Director</h2>
        <div class="cast-grid">
          <div class="cast-member" onclick="window.location.href='director-details.html?id=${director.id}'">
            <img src="${director.photo}" alt="${director.name}">
            <h4>${director.name}</h4>
            <span>Director</span>
          </div>
        </div>
      </div>
    `;
  }

  // Cast Section (Actors)
  if (movie.actorIds && movie.actorIds.length > 0) {
    html += `<div class="cast-section"><h2>Cast (Actors)</h2><div class="cast-grid">`;
    
    movie.actorIds.forEach(actorId => {
      const actor = window.getActor(actorId);
      if (actor) {
        html += `
          <div class="cast-member" onclick="window.location.href='actor-details.html?id=${actor.id}'">
            <img src="${actor.photo}" alt="${actor.name}">
            <h4>${actor.name}</h4>
            <span>Actor</span>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }

  // Cast Section (Actresses)
  if (movie.actressIds && movie.actressIds.length > 0) {
    html += `<div class="cast-section"><h2>Cast (Actresses)</h2><div class="cast-grid">`;
    
    movie.actressIds.forEach(actressId => {
      const actress = window.getActress(actressId);
      if (actress) {
        html += `
          <div class="cast-member" onclick="window.location.href='actress-details.html?id=${actress.id}'">
            <img src="${actress.photo}" alt="${actress.name}">
            <h4>${actress.name}</h4>
            <span>Actress</span>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }

  // Cast Section (Comedians)
  if (movie.comedianIds && movie.comedianIds.length > 0) {
    html += `<div class="cast-section"><h2>Cast (Comedians)</h2><div class="cast-grid">`;
    
    movie.comedianIds.forEach(comedianId => {
      const comedian = window.getComedian(comedianId);
      if (comedian) {
        html += `
          <div class="cast-member" onclick="window.location.href='comedian-details.html?id=${comedian.id}'">
            <img src="${comedian.photo}" alt="${comedian.name}">
            <h4>${comedian.name}</h4>
            <span>Comedian</span>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }

  container.innerHTML = html;
});