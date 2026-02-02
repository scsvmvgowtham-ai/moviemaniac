// ================= COMEDIANS PAGE - comedians.js =================

document.addEventListener("DOMContentLoaded", () => {
  const industryHub = document.getElementById("industryHub");
  const container = document.getElementById("comediansContainer");
  const backBtn = document.getElementById("backToIndustries");

  const { comedians } = window.MovieManiacData;

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
    showComediansByIndustry(industry);
  }

  // ================= DISPLAY COMEDIANS =================
  function showComediansByIndustry(selectedIndustry) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${selectedIndustry} Comedians`;
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
        id="comedianSearch"
        placeholder="Search comedians..."
        style="padding:12px 20px;width:300px;background:rgba(255,255,255,0.05);border:2px solid rgba(212,175,55,0.3);border-radius:50px;color:#e0e0e0;font-size:1rem;"
      >
    `;
    container.appendChild(searchBox);

    const grid = document.createElement("div");
    grid.className = "actor-grid";
    grid.id = "comedianGrid";

    const filteredComedians = comedians.filter(c => c.industry === selectedIndustry);

    // Display all comedians initially
    displayComedians(filteredComedians, grid);

    container.appendChild(grid);

    // Add search functionality
    const searchInput = document.getElementById("comedianSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const searchResults = filteredComedians.filter(c =>
          c.name.toLowerCase().includes(value)
        );
        displayComedians(searchResults, grid);
      });
    }
  }

  // ================= DISPLAY COMEDIANS FUNCTION =================
  function displayComedians(comedianList, gridElement) {
    gridElement.innerHTML = "";
    
    comedianList.forEach(comedian => {
      const card = document.createElement("div");
      card.className = "actor-card";
      card.innerHTML = `
        <img src="${comedian.photo}" alt="${comedian.name}">
        <h4>${comedian.name}</h4>
      `;
      card.onclick = () => {
        window.location.href = `comedian-details.html?id=${comedian.id}`;
      };
      gridElement.appendChild(card);
    });

    // Show message if no comedians found
    if (comedianList.length === 0) {
      gridElement.innerHTML = "<p style='text-align:center;color:#e0e0e0;'>No comedians found.</p>";
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