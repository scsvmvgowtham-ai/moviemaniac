// ================= HOMEPAGE - app.js =================

document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.getElementById("movieGrid");
  const searchInput = document.getElementById("searchInput");
  const industryHub = document.getElementById("industryHub");
  const backBtn = document.getElementById("backToIndustries");

  // Get data from centralized data file
  const { movies } = window.MovieManiacData;

  // ================= WATCHLIST FUNCTIONALITY =================
  window.MovieManiacWatchlist = {
    get: function() {
      const watchlist = localStorage.getItem('moviemaniac_watchlist');
      return watchlist ? JSON.parse(watchlist) : [];
    },
    add: function(movieId) {
      const watchlist = this.get();
      if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem('moviemaniac_watchlist', JSON.stringify(watchlist));
        return true;
      }
      return false;
    },
    remove: function(movieId) {
      let watchlist = this.get();
      watchlist = watchlist.filter(id => id !== movieId);
      localStorage.setItem('moviemaniac_watchlist', JSON.stringify(watchlist));
    },
    has: function(movieId) {
      return this.get().includes(movieId);
    }
  };

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
    
    if (movieList.length === 0) {
      movieGrid.innerHTML = "<p class='no-results'>No movies found</p>";
      return;
    }
    
    movieList.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      
      const isInWatchlist = window.MovieManiacWatchlist.has(movie.id);
      
      card.innerHTML = `
        <div class="watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}" data-movie-id="${movie.id}">
          ${isInWatchlist ? '❤️' : '🤍'}
        </div>
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year} • ${movie.genre}</p>
      `;
      
      // Watchlist button click
      const watchlistBtn = card.querySelector('.watchlist-btn');
      watchlistBtn.onclick = (e) => {
        e.stopPropagation();
        toggleWatchlist(movie.id, watchlistBtn);
      };
      
      // Card click
      card.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };
      
      movieGrid.appendChild(card);
    });
  }

  // ================= TOGGLE WATCHLIST =================
  function toggleWatchlist(movieId, btn) {
    if (window.MovieManiacWatchlist.has(movieId)) {
      window.MovieManiacWatchlist.remove(movieId);
      btn.innerHTML = '🤍';
      btn.classList.remove('in-watchlist');
      showNotification('Removed from watchlist');
    } else {
      window.MovieManiacWatchlist.add(movieId);
      btn.innerHTML = '❤️';
      btn.classList.add('in-watchlist');
      showNotification('Added to watchlist');
    }
  }

  // ================= NOTIFICATION =================
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
});