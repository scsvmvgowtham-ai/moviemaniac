// ================= WATCHLIST PAGE - watchlist.js =================

document.addEventListener("DOMContentLoaded", () => {
  const watchlistGrid = document.getElementById("watchlistGrid");
  const watchlistStats = document.getElementById("watchlistStats");

  // Watchlist functionality
  window.MovieManiacWatchlist = {
    get: function() {
      const watchlist = localStorage.getItem('moviemaniac_watchlist');
      return watchlist ? JSON.parse(watchlist) : [];
    },
    remove: function(movieId) {
      let watchlist = this.get();
      watchlist = watchlist.filter(id => id !== movieId);
      localStorage.setItem('moviemaniac_watchlist', JSON.stringify(watchlist));
    }
  };

  function displayWatchlist() {
    const watchlistIds = window.MovieManiacWatchlist.get();
    const { movies } = window.MovieManiacData;

    if (!watchlistGrid) return;

    if (watchlistIds.length === 0) {
      watchlistGrid.innerHTML = `
        <div class="empty-watchlist">
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies to your watchlist!</p>
          <a href="index.html" class="btn-primary">Browse Movies</a>
        </div>
      `;
      if (watchlistStats) watchlistStats.innerHTML = "";
      return;
    }

    // Get watchlist movies
    const watchlistMovies = watchlistIds
      .map(id => movies.find(m => m.id === id))
      .filter(m => m); // Remove any undefined movies

    // Display stats
    if (watchlistStats) {
      const industries = [...new Set(watchlistMovies.map(m => m.industry))];
      const genres = [...new Set(watchlistMovies.map(m => m.genre.split('•')[0].trim()))];
      
      watchlistStats.innerHTML = `
        <div class="stats-container">
          <div class="stat-item">
            <span class="stat-number">${watchlistMovies.length}</span>
            <span class="stat-label">Movies</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${industries.length}</span>
            <span class="stat-label">Industries</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${genres.length}</span>
            <span class="stat-label">Genres</span>
          </div>
        </div>
      `;
    }

    // Display movies
    watchlistGrid.innerHTML = "";
    watchlistMovies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <div class="watchlist-btn in-watchlist" data-movie-id="${movie.id}">
          ❤️
        </div>
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year} • ${movie.genre}</p>
      `;

      // Watchlist button
      const watchlistBtn = card.querySelector('.watchlist-btn');
      watchlistBtn.onclick = (e) => {
        e.stopPropagation();
        removeFromWatchlist(movie.id);
      };

      // Card click
      card.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };

      watchlistGrid.appendChild(card);
    });
  }

  function removeFromWatchlist(movieId) {
    window.MovieManiacWatchlist.remove(movieId);
    showNotification('Removed from watchlist');
    displayWatchlist(); // Refresh display
  }

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

  // Initial display
  displayWatchlist();
});