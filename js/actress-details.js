// ================= ACTRESS DETAILS PAGE - actress-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const actressId = params.get("id");
  
  const actressName = document.getElementById("actressName");
  const actressImage = document.getElementById("actressImage");
  const actressIndustry = document.getElementById("actressIndustry");
  const actressMoviesDiv = document.getElementById("actressMovies");

  if (!actressId) return;

  const actress = window.getActress(actressId);

  if (!actress) {
    if (actressName) actressName.textContent = "Actress not found";
    return;
  }

  // Display actress info
  if (actressName) actressName.textContent = actress.name;
  if (actressImage) actressImage.src = actress.photo;
  if (actressIndustry) actressIndustry.textContent = actress.industry;

  // Get related movies
  const relatedMovies = window.getMoviesByActress(actressId);

  if (!actressMoviesDiv) return;

  if (relatedMovies.length === 0) {
    actressMoviesDiv.innerHTML = "<p>No movies available yet.</p>";
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
      
      actressMoviesDiv.appendChild(card);
    });
  }
});