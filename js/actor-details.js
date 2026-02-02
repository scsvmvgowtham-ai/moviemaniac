// ================= ACTOR DETAILS PAGE - actor-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const actorId = params.get("id");
  
  const actorName = document.getElementById("actorName");
  const actorImage = document.getElementById("actorImage");
  const actorIndustry = document.getElementById("actorIndustry");
  const actorMoviesDiv = document.getElementById("actorMovies");

  if (!actorId) return;

  const actor = window.getActor(actorId);

  if (!actor) {
    if (actorName) actorName.textContent = "Actor not found";
    return;
  }

  // Display actor info
  if (actorName) actorName.textContent = actor.name;
  if (actorImage) actorImage.src = actor.photo;
  if (actorIndustry) actorIndustry.textContent = actor.industry;

  // Get related movies
  const relatedMovies = window.getMoviesByActor(actorId);

  if (!actorMoviesDiv) return;

  if (relatedMovies.length === 0) {
    actorMoviesDiv.innerHTML = "<p>No movies available yet.</p>";
  } else {
    relatedMovies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year} • ${movie.genre}</p>
      `;
      
      card.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };
      
      actorMoviesDiv.appendChild(card);
    });
  }
});