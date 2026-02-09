// ================= ACTOR DETAILS PAGE - actor-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const actorId = params.get("id");
  
  // Get all DOM elements
  const actorName = document.getElementById("actorName");
  const actorImage = document.getElementById("actorImage");
  const actorRoles = document.getElementById("actorRoles");
  const actorIndustry = document.getElementById("actorIndustry");
  const actorFullName = document.getElementById("actorFullName");
  const actorBorn = document.getElementById("actorBorn");
  const actorBirthPlace = document.getElementById("actorBirthPlace");
  const actorSpouse = document.getElementById("actorSpouse");
  const actorParents = document.getElementById("actorParents");
  const actorSiblings = document.getElementById("actorSiblings");
  const actorAchievements = document.getElementById("actorAchievements");
  const actorBio = document.getElementById("actorBio");
  const actorMoviesDiv = document.getElementById("actorMovies");

  if (!actorId) {
    if (actorName) actorName.textContent = "No actor selected";
    return;
  }

  const actor = window.getActor(actorId);

  if (!actor) {
    if (actorName) actorName.textContent = "Actor not found";
    return;
  }

  // ================= DISPLAY ACTOR INFO =================
  if (actorName) actorName.textContent = actor.name;
  if (actorImage) {
    actorImage.src = actor.photo;
    actorImage.alt = actor.name;
  }
  
  // ================= DISPLAY ROLES (NEW) =================
  if (actorRoles && actor.roles && actor.roles.length > 0) {
    actorRoles.innerHTML = actor.roles.map(role => 
      `<span class="role-badge">${role.charAt(0).toUpperCase() + role.slice(1)}</span>`
    ).join('');
  }
  
  if (actorIndustry) actorIndustry.textContent = actor.industry;
  
  // Display full name (just the value, no label)
  if (actorFullName) {
    actorFullName.textContent = actor.fullName || "Not available";
  }
  
  // Display personal information (just values, labels are in HTML)
  if (actorBorn) {
    actorBorn.textContent = actor.born || "Not available";
  }
  
  if (actorBirthPlace) {
    actorBirthPlace.textContent = actor.birthPlace || "Not available";
  }
  
  if (actorSpouse) {
    actorSpouse.textContent = actor.spouse || "Not available";
  }
  
  if (actorParents) {
    if (actor.parents && actor.parents.length > 0) {
      actorParents.textContent = actor.parents.join(", ");
    } else {
      actorParents.textContent = "Not available";
    }
  }
  
  if (actorSiblings) {
    if (actor.siblings && actor.siblings.length > 0) {
      actorSiblings.textContent = actor.siblings.join(", ");
    } else {
      actorSiblings.textContent = "Not available";
    }
  }
  
  if (actorAchievements) {
    actorAchievements.textContent = actor.achievements || "Not available";
  }
  
  if (actorBio) {
    actorBio.textContent = actor.bio || "Biography not available.";
  }

  // ================= GET AND DISPLAY RELATED MOVIES =================
  const relatedMovies = window.getMoviesByActor(actorId);

  if (!actorMoviesDiv) return;

  if (relatedMovies.length === 0) {
    actorMoviesDiv.innerHTML = "<p style='text-align:center;color:#e0e0e0;padding:2rem;'>No movies available yet.</p>";
  } else {
    actorMoviesDiv.innerHTML = ""; // Clear any existing content
    
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
      
      actorMoviesDiv.appendChild(card);
    });
  }
});