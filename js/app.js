// ================= HOMEPAGE - app.js =================

document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.getElementById("movieGrid");
  const searchInput = document.getElementById("searchInput");
  const industryHub = document.getElementById("industryHub");
  const backBtn = document.getElementById("backToIndustries");

  // Get data from centralized data file
  const { movies } = window.MovieManiacData;

  // ================= INDUSTRY HUB =================
  const industries = [
    "Tollywood",
    "Hollywood",
    "Bollywood",
    "Kollywood",
    "Mollywood",
    "Sandalwood"
  ];

  industries.forEach(industry => {
    const card = document.createElement("div");
    card.className = "hubCard";
    card.textContent = industry;
    
    card.onclick = () => {
      window.location.href = `industry.html?industry=${industry}`;
    };
    
    industryHub.appendChild(card);
  });

  // ================= MOVIE SLIDESHOW =================
  const slideshowMovies = movies.slice(0, 5); // First 5 movies
  const slideshow = document.getElementById("movieSlideshow");

  if (slideshow) {
    slideshowMovies.forEach(movie => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="slide-title">
          <h2>${movie.title}</h2>
          <span>${movie.industry}</span>
        </div>
      `;
      slideshow.appendChild(slide);
    });

    // Auto-slide functionality
    let slideIndex = 0;
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slideshowMovies.length;
      slideshow.style.transform = `translateX(-${slideIndex * 100}%)`;
    }, 4000);
  }

  // ================= SEARCH FUNCTIONALITY =================
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      displayMovies(
        movies.filter(m =>
          m.title.toLowerCase().includes(searchTerm)
        )
      );
    });
  }

  // ================= DISPLAY MOVIES FUNCTION =================
  function displayMovies(movieList) {
    if (!movieGrid) return;
    
    movieGrid.innerHTML = "";
    
    movieList.forEach(movie => {
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
      
      movieGrid.appendChild(card);
    });
  }
});