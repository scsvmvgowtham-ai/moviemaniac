// ================= ENHANCED INDUSTRY PAGE - industry.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const industry = params.get("industry");
  
  const industryTitle = document.getElementById("industryTitle");
  const industryBanner = document.getElementById("industryBanner");
  const grid = document.getElementById("industryMovieGrid");

  if (!industry) return;

  const { movies } = window.MovieManiacData;

  let currentGenre = null;

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

  // Set title
  if (industryTitle) {
    industryTitle.textContent = industry;
  }

  // Set banner background
  if (industryBanner) {
    industryBanner.style.backgroundImage = `url(images/industries/${industry.toLowerCase()}.jpg)`;
  }

  // ================= CREATE GENRE FILTER =================
  createGenreFilter(industry);

  // ================= DISPLAY INITIAL MOVIES =================
  displayMoviesByIndustry(industry);

  // ================= GENRE FILTER FUNCTION =================
  function createGenreFilter(industry) {
    const industryMovies = movies.filter(m => m.industry === industry);
    const genres = [...new Set(industryMovies.map(m => {
      return m.genre.split('•')[0].trim();
    }))].sort();

    // Create filter container
    const filterContainer = document.createElement("div");
    filterContainer.className = "genre-filter";
    
    const filterTitle = document.createElement("h3");
    filterTitle.textContent = "🎭 Filter by Genre";
    filterContainer.appendChild(filterTitle);

    const filterButtons = document.createElement("div");
    filterButtons.className = "genre-buttons";

    // "All" button
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.className = "genre-btn active";
    allBtn.onclick = () => {
      currentGenre = null;
      document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      displayMoviesByIndustry(industry);
    };
    filterButtons.appendChild(allBtn);

    // Genre buttons
    genres.forEach(genre => {
      const btn = document.createElement("button");
      btn.textContent = genre;
      btn.className = "genre-btn";
      btn.onclick = () => {
        currentGenre = genre;
        document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayMoviesByIndustry(industry, genre);
      };
      filterButtons.appendChild(btn);
    });

    filterContainer.appendChild(filterButtons);
    
    // Insert before movie grid
    const featured = document.querySelector('.featured');
    if (featured && grid) {
      featured.insertBefore(filterContainer, grid);
    }
  }

  // ================= DISPLAY MOVIES =================
  function displayMoviesByIndustry(industry, genre = null) {
    if (!grid) return;

    let filteredMovies = movies.filter(m => m.industry === industry);
    
    // Apply genre filter if selected
    if (genre) {
      filteredMovies = filteredMovies.filter(m => 
        m.genre.split('•')[0].trim() === genre
      );
    }

    grid.innerHTML = "";

    if (filteredMovies.length === 0) {
      grid.innerHTML = "<p class='no-results'>No movies found</p>";
      return;
    }
    
    filteredMovies.forEach(movie => {
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
      
      grid.appendChild(card);
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