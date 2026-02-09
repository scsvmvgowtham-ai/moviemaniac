// ================= COMEDIAN DETAILS PAGE - comedian-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const comedianId = params.get("id");
  
  // Get all DOM elements
  const comedianName = document.getElementById("comedianName");
  const comedianImage = document.getElementById("comedianImage");
  const comedianRoles = document.getElementById("comedianRoles");
  const comedianIndustry = document.getElementById("comedianIndustry");
  const comedianFullName = document.getElementById("comedianFullName");
  const comedianBorn = document.getElementById("comedianBorn");
  const comedianBirthPlace = document.getElementById("comedianBirthPlace");
  const comedianSpouse = document.getElementById("comedianSpouse");
  const comedianParents = document.getElementById("comedianParents");
  const comedianSiblings = document.getElementById("comedianSiblings");
  const comedianAchievements = document.getElementById("comedianAchievements");
  const comedianBio = document.getElementById("comedianBio");
  const comedianMoviesDiv = document.getElementById("comedianMovies");

  if (!comedianId) {
    if (comedianName) comedianName.textContent = "No comedian selected";
    return;
  }

  const comedian = window.getComedian(comedianId);

  if (!comedian) {
    if (comedianName) comedianName.textContent = "Comedian not found";
    return;
  }

  // ================= DISPLAY COMEDIAN INFO =================
  if (comedianName) comedianName.textContent = comedian.name;
  if (comedianImage) {
    comedianImage.src = comedian.photo;
    comedianImage.alt = comedian.name;
  }
  
  // ================= DISPLAY ROLES (NEW) =================
  if (comedianRoles && comedian.roles && comedian.roles.length > 0) {
    comedianRoles.innerHTML = comedian.roles.map(role => 
      `<span class="role-badge">${role.charAt(0).toUpperCase() + role.slice(1)}</span>`
    ).join('');
  }
  
  if (comedianIndustry) comedianIndustry.textContent = comedian.industry;
  
  // Display full name (just the value, no label)
  if (comedianFullName) {
    comedianFullName.textContent = comedian.fullName || "Not available";
  }
  
  // Display personal information (just values, labels are in HTML)
  if (comedianBorn) {
    comedianBorn.textContent = comedian.born || "Not available";
  }
  
  if (comedianBirthPlace) {
    comedianBirthPlace.textContent = comedian.birthPlace || "Not available";
  }
  
  if (comedianSpouse) {
    comedianSpouse.textContent = comedian.spouse || "Not available";
  }
  
  if (comedianParents) {
    if (comedian.parents && comedian.parents.length > 0) {
      comedianParents.textContent = comedian.parents.join(", ");
    } else {
      comedianParents.textContent = "Not available";
    }
  }
  
  if (comedianSiblings) {
    if (comedian.siblings && comedian.siblings.length > 0) {
      comedianSiblings.textContent = comedian.siblings.join(", ");
    } else {
      comedianSiblings.textContent = "Not available";
    }
  }
  
  if (comedianAchievements) {
    comedianAchievements.textContent = comedian.achievements || "Not available";
  }
  
  if (comedianBio) {
    comedianBio.textContent = comedian.bio || "Biography not available.";
  }

  // ================= GET AND DISPLAY RELATED MOVIES =================
  const relatedMovies = window.getMoviesByComedian(comedianId);

  if (!comedianMoviesDiv) return;

  if (relatedMovies.length === 0) {
    comedianMoviesDiv.innerHTML = "<p style='text-align:center;color:#e0e0e0;padding:2rem;'>No movies available yet.</p>";
  } else {
    comedianMoviesDiv.innerHTML = ""; // Clear any existing content
    
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