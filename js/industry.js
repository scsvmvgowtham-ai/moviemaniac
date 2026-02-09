// ================= ENHANCED INDUSTRY PAGE - industry.js =================

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const industry = params.get("industry");

  const industryTitle = document.getElementById("industryTitle");
  const industryBanner = document.getElementById("industryBanner");
  const grid = document.getElementById("industryMovieGrid");

  if (!industry || !grid) return;

  if (!window.MovieManiacData || !Array.isArray(window.MovieManiacData.movies)) {
    console.error("MovieManiacData not loaded");
    return;
  }

  const movies = window.MovieManiacData.movies;

  let currentGenre = null;
  let currentDecade = null;

  // ================= WATCHLIST =================
  window.MovieManiacWatchlist = {
    get: function () {
      return JSON.parse(localStorage.getItem("moviemaniac_watchlist")) || [];
    },
    add: function (id) {
      const list = this.get();
      if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem("moviemaniac_watchlist", JSON.stringify(list));
      }
    },
    remove: function (id) {
      const list = this.get().filter(function (i) {
        return i !== id;
      });
      localStorage.setItem("moviemaniac_watchlist", JSON.stringify(list));
    },
    has: function (id) {
      return this.get().includes(id);
    }
  };

  if (industryTitle) industryTitle.textContent = industry;
  if (industryBanner) {
    industryBanner.style.backgroundImage =
      "url(images/industries/" + industry.toLowerCase() + ".jpg)";
  }

  function getDecadeFromYear(year) {
    if (!year) return "Unknown";
    return Math.floor(year / 10) * 10 + "s";
  }

  createGenreFilter();
  createDecadeFilter();
  displayMovies();

  // ================= GENRE FILTER =================
  function createGenreFilter() {
    const genres = Array.from(
      new Set(
        movies
          .filter(function (m) {
            return m.industry === industry;
          })
          .map(function (m) {
            return m.genre.split("•")[0].trim();
          })
      )
    ).sort();

    const container = document.createElement("div");
    container.className = "genre-filter";

    const title = document.createElement("h3");
    title.textContent = "Filter by Genre";
    container.appendChild(title);

    const buttons = document.createElement("div");
    buttons.className = "genre-buttons";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All Genres";
    allBtn.className = "genre-btn active";
    allBtn.onclick = function () {
      currentGenre = null;
      setActive(buttons, allBtn);
      displayMovies();
    };
    buttons.appendChild(allBtn);

    genres.forEach(function (g) {
      const btn = document.createElement("button");
      btn.textContent = g;
      btn.className = "genre-btn";
      btn.onclick = function () {
        currentGenre = g;
        setActive(buttons, btn);
        displayMovies();
      };
      buttons.appendChild(btn);
    });

    container.appendChild(buttons);
    document.querySelector(".featured")?.insertBefore(container, grid);
  }

  // ================= DECADE FILTER =================
  function createDecadeFilter() {
    const decades = Array.from(
      new Set(
        movies
          .filter(function (m) {
            return m.industry === industry;
          })
          .map(function (m) {
            return getDecadeFromYear(m.year);
          })
      )
    ).sort(function (a, b) {
      return parseInt(b) - parseInt(a);
    });

    const container = document.createElement("div");
    container.className = "genre-filter";

    const title = document.createElement("h3");
    title.textContent = "Filter by Decade";
    container.appendChild(title);

    const buttons = document.createElement("div");
    buttons.className = "genre-buttons";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All Movies";
    allBtn.className = "decade-btn active";
    allBtn.onclick = function () {
      currentDecade = null;
      setActive(buttons, allBtn);
      displayMovies();
    };
    buttons.appendChild(allBtn);

    decades.forEach(function (d) {
      const btn = document.createElement("button");
      btn.textContent = d;
      btn.className = "decade-btn";
      btn.onclick = function () {
        currentDecade = d;
        setActive(buttons, btn);
        displayMovies();
      };
      buttons.appendChild(btn);
    });

    container.appendChild(buttons);
    document.querySelector(".featured")?.insertBefore(container, grid);
  }

  // ================= DISPLAY MOVIES =================
  function displayMovies() {
    let filtered = movies.filter(function (m) {
      return m.industry === industry;
    });

    if (currentGenre) {
      filtered = filtered.filter(function (m) {
        return m.genre.split("•")[0].trim() === currentGenre;
      });
    }

    if (currentDecade) {
      filtered = filtered.filter(function (m) {
        return getDecadeFromYear(m.year) === currentDecade;
      });
    }

    grid.innerHTML = "";

    if (!filtered.length) {
      grid.innerHTML = "<p class='no-results'>No movies found</p>";
      return;
    }

    filtered.forEach(function (movie) {
      const card = document.createElement("div");
      card.className = "movie-card";

      const inWatchlist = window.MovieManiacWatchlist.has(movie.id);

      card.innerHTML =
        '<div class="watchlist-btn ' +
        (inWatchlist ? "in-watchlist" : "") +
        '">' +
        (inWatchlist ? "&hearts;" : "&#9825;") +
        "</div>" +
        '<img src="' +
        movie.poster +
        '" alt="' +
        movie.title +
        '">' +
        "<h3>" +
        movie.title +
        "</h3>" +
        "<p>" +
        movie.year +
        " • " +
        movie.genre +
        "</p>";

      card.onclick = function () {
        window.location.href = "movie-details.html?id=" + movie.id;
      };

      card.querySelector(".watchlist-btn").onclick = function (e) {
        e.stopPropagation();
        if (inWatchlist) {
          window.MovieManiacWatchlist.remove(movie.id);
        } else {
          window.MovieManiacWatchlist.add(movie.id);
        }
        displayMovies();
      };

      grid.appendChild(card);
    });
  }

  function setActive(container, activeBtn) {
    container.querySelectorAll("button").forEach(function (b) {
      b.classList.remove("active");
    });
    activeBtn.classList.add("active");
  }
});
