// ================= INDUSTRY PAGE - industry.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const industry = params.get("industry");
  
  const industryTitle = document.getElementById("industryTitle");
  const industryBanner = document.getElementById("industryBanner");
  const grid = document.getElementById("industryMovieGrid");

  if (!industry) return;

  const { movies } = window.MovieManiacData;

  // Set title
  if (industryTitle) {
    industryTitle.textContent = industry;
  }

  // Set banner background
  if (industryBanner) {
    industryBanner.style.backgroundImage = `url(images/industries/${industry.toLowerCase()}.jpg)`;
  }

  // Filter and display movies
  if (grid) {
    const filteredMovies = movies.filter(movie => movie.industry === industry);
    
    filteredMovies.forEach(movie => {
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
      
      grid.appendChild(card);
    });
  }
});