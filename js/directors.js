// ================= DIRECTORS PAGE - directors.js =================

document.addEventListener("DOMContentLoaded", () => {
  const industryHub = document.getElementById("industryHub");
  const container = document.getElementById("directorsContainer");
  const backBtn = document.getElementById("backToIndustries");

  const { directors } = window.MovieManiacData;

  // ================= INDUSTRY HUB =================
  const industries = ["Tollywood", "Hollywood", "Bollywood", "Kollywood", "Mollywood", "Sandalwood"];

  industries.forEach(industry => {
    const hubCard = document.createElement("div");
    hubCard.className = "card hubCard";
    hubCard.textContent = industry;
    hubCard.onclick = () => openIndustry(industry);
    industryHub.appendChild(hubCard);
  });

  // ================= OPEN INDUSTRY =================
  function openIndustry(industry) {
    industryHub.style.display = "none";
    backBtn.style.display = "block";
    showDirectorsByIndustry(industry);
  }

  // ================= DISPLAY DIRECTORS =================
  function showDirectorsByIndustry(selectedIndustry) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${selectedIndustry} Directors`;
    title.style.color = "#d4af37";
    title.style.margin = "30px 0";
    title.style.textAlign = "center";
    title.style.fontFamily = "'Cinzel', serif";
    container.appendChild(title);

    // Add search box
    const searchBox = document.createElement("div");
    searchBox.style.textAlign = "center";
    searchBox.style.marginBottom = "30px";
    searchBox.innerHTML = `
      <input
        type="text"
        id="directorSearch"
        placeholder="Search directors..."
        style="padding:12px 20px;width:300px;background:rgba(255,255,255,0.05);border:2px solid rgba(212,175,55,0.3);border-radius:50px;color:#e0e0e0;font-size:1rem;"
      >
    `;
    container.appendChild(searchBox);

    const grid = document.createElement("div");
    grid.className = "director-grid";
    grid.id = "directorGrid";

    const filteredDirectors = directors.filter(d => d.industry === selectedIndustry);

    // Display all directors initially
    displayDirectors(filteredDirectors, grid);

    container.appendChild(grid);

    // Add search functionality
    const searchInput = document.getElementById("directorSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const searchResults = filteredDirectors.filter(d =>
          d.name.toLowerCase().includes(value)
        );
        displayDirectors(searchResults, grid);
      });
    }
  }

  // ================= DISPLAY DIRECTORS FUNCTION =================
  function displayDirectors(directorList, gridElement) {
    gridElement.innerHTML = "";
    
    directorList.forEach(director => {
      const card = document.createElement("div");
      card.className = "actor-card";
      card.innerHTML = `
        <img src="${director.photo}" alt="${director.name}">
        <h4>${director.name}</h4>
      `;
      card.onclick = () => {
        window.location.href = `director-details.html?id=${director.id}`;
      };
      gridElement.appendChild(card);
    });

    // Show message if no directors found
    if (directorList.length === 0) {
      gridElement.innerHTML = "<p style='text-align:center;color:#e0e0e0;'>No directors found.</p>";
    }
  }

  // ================= BACK BUTTON =================
  backBtn.onclick = () => {
    container.innerHTML = "";
    industryHub.style.display = "grid";
    backBtn.style.display = "none";
  };

  // ================= URL PARAMETER HANDLING =================
  const params = new URLSearchParams(window.location.search);
  const urlIndustry = params.get("industry");

  if (urlIndustry) {
    const formatted = urlIndustry.charAt(0).toUpperCase() + urlIndustry.slice(1).toLowerCase();
    openIndustry(formatted);
  }
});