// ================= HOME PAGE - home.js =================

document.addEventListener("DOMContentLoaded", () => {
  const homeNavGrid = document.getElementById("homeNavGrid");

  // ================= NAVIGATION CARDS =================
  const navigationItems = [
    {
      title: "Movies",
      icon: "🎬",
      description: "Explore our vast collection of movies from around the world",
      link: "index.html",
      color: "#e74c3c"
    },
    {
      title: "Actors",
      icon: "🎭",
      description: "Discover talented actors and their remarkable performances",
      link: "actors.html",
      color: "#3498db"
    },
    {
      title: "Actresses",
      icon: "👩‍🎤",
      description: "Celebrate the leading ladies of cinema",
      link: "actresses.html",
      color: "#e91e63"
    },
    {
      title: "Comedians",
      icon: "😂",
      description: "Meet the artists who make us laugh",
      link: "comedians.html",
      color: "#f39c12"
    },
    {
      title: "Directors",
      icon: "🎥",
      description: "Learn about the visionary directors behind your favorite films",
      link: "directors.html",
      color: "#9b59b6"
    }
  ];

  // ================= CREATE NAVIGATION CARDS =================
  navigationItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "home-nav-card";
    card.style.setProperty('--card-color', item.color);
    
    card.innerHTML = `
      <div class="nav-icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="nav-arrow">→</div>
    `;
    
    card.onclick = () => {
      window.location.href = item.link;
    };
    
    homeNavGrid.appendChild(card);
  });
});