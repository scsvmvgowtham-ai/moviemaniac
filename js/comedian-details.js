// ================= COMEDIAN DETAILS PAGE - comedian-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const comedianId = params.get("id");
  
  const comedianName = document.getElementById("comedianName");
  const comedianImage = document.getElementById("comedianImage");
  const comedianIndustry = document.getElementById("comedianIndustry");
  const comedianMoviesDiv = document.getElementById("comedianMovies");

  if (!comedianId) return;

  const comedian = window.getComedian(comedianId);

  if (!comedian) {
    if (comedianName) comedianName.textContent = "Comedian not found";
    return;
  }

  // Display comedian info
  if (comedianName) comedianName.textContent = comedian.name;
  if (comedianImage) comedianImage.src = comedian.photo;
  if (comedianIndustry) comedianIndustry.textContent = comedian.industry;

  // Get related movies
  const relatedMovies = window.getMoviesByComedian(comedianId);

  if (!comedianMoviesDiv) return;

  if (relatedMovies.length === 0) {
    comedianMoviesDiv.innerHTML = "<p>No movies available yet.</p>";
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
      
      comedianMoviesDiv.appendChild(card);
    });
  }
});