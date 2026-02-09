// ================= ACTRESS DETAILS PAGE - actress-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const actressId = params.get("id");
  
  // Get all DOM elements
  const actressName = document.getElementById("actressName");
  const actressImage = document.getElementById("actressImage");
  const actressIndustry = document.getElementById("actressIndustry");
  const actressFullName = document.getElementById("actressFullName");
  const actressBorn = document.getElementById("actressBorn");
  const actressBirthPlace = document.getElementById("actressBirthPlace");
  const actressSpouse = document.getElementById("actressSpouse");
  const actressParents = document.getElementById("actressParents");
  const actressSiblings = document.getElementById("actressSiblings");
  const actressAchievements = document.getElementById("actressAchievements");
  const actressBio = document.getElementById("actressBio");
  const actressMoviesDiv = document.getElementById("actressMovies");

  if (!actressId) {
    if (actressName) actressName.textContent = "No actress selected";
    return;
  }

  const actress = window.getActress(actressId);

  if (!actress) {
    if (actressName) actressName.textContent = "Actress not found";
    return;
  }

  // ================= DISPLAY ACTRESS INFO =================
  if (actressName) actressName.textContent = actress.name;
  if (actressImage) {
    actressImage.src = actress.photo;
    actressImage.alt = actress.name;
  }
  if (actressIndustry) actressIndustry.textContent = actress.industry;
  
  // Display full name (just the value, no label)
  if (actressFullName) {
    actressFullName.textContent = actress.fullName || "Not available";
  }
  
  // Display personal information (just values, labels are in HTML)
  if (actressBorn) {
    actressBorn.textContent = actress.born || "Not available";
  }
  
  if (actressBirthPlace) {
    actressBirthPlace.textContent = actress.birthPlace || "Not available";
  }
  
  if (actressSpouse) {
    actressSpouse.textContent = actress.spouse || "Not available";
  }
  
  if (actressParents) {
    if (actress.parents && actress.parents.length > 0) {
      actressParents.textContent = actress.parents.join(", ");
    } else {
      actressParents.textContent = "Not available";
    }
  }
  
  if (actressSiblings) {
    if (actress.siblings && actress.siblings.length > 0) {
      actressSiblings.textContent = actress.siblings.join(", ");
    } else {
      actressSiblings.textContent = "Not available";
    }
  }
  
  if (actressAchievements) {
    actressAchievements.textContent = actress.achievements || "Not available";
  }
  
  if (actressBio) {
    actressBio.textContent = actress.bio || "Biography not available.";
  }

  // ================= GET AND DISPLAY RELATED MOVIES =================
  const relatedMovies = window.getMoviesByActress(actressId);

  if (!actressMoviesDiv) return;

  if (relatedMovies.length === 0) {
    actressMoviesDiv.innerHTML = "<p style='text-align:center;color:#e0e0e0;padding:2rem;'>No movies available yet.</p>";
  } else {
    actressMoviesDiv.innerHTML = ""; // Clear any existing content
    
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