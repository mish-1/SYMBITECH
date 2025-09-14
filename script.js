// =========================
// Homepage countdown (only on index.html)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("home-page")) return;

  const dd = document.getElementById("dd");
  const hh = document.getElementById("hh");
  const mm = document.getElementById("mm");
  const ss = document.getElementById("ss");

  if (!dd || !hh || !mm || !ss) {
    console.warn("Countdown elements not found on page");
    return;
  }

  const eventDate = new Date(2025, 8, 19, 0, 0, 0); // 19 Sept 2025

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
      dd.textContent = "00";
      hh.textContent = "00";
      mm.textContent = "00";
      ss.textContent = "00";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    dd.textContent = String(days).padStart(2, "0");
    hh.textContent = String(hours).padStart(2, "0");
    mm.textContent = String(minutes).padStart(2, "0");
    ss.textContent = String(seconds).padStart(2, "0");
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
});




// =========================
// Events filtering & clicks (only on events.html)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("events-page")) return;

  const searchBox = document.getElementById("search");
  const container = document.getElementById("events-container");

  if (!searchBox || !container) return;

  // ensure "no events" message
  let noEventsMsg = container.querySelector(".no-events");
  if (!noEventsMsg) {
    noEventsMsg = document.createElement("div");
    noEventsMsg.className = "no-events";
    noEventsMsg.textContent = "No events found.";
    noEventsMsg.style.display = "none";
    container.appendChild(noEventsMsg);
  }

  const getTypeFilters = () => [...document.querySelectorAll(".filter-type")];
  const getClubFilters = () => [...document.querySelectorAll(".filter-club")];
  const getEventCards = () => [...document.querySelectorAll(".event-card")];

  function filterEvents() {
    const events = getEventCards();
    const selectedTypes = getTypeFilters().filter(cb => cb.checked).map(cb => cb.value.toLowerCase().trim());
    const selectedClubs = getClubFilters().filter(cb => cb.checked).map(cb => cb.value.toLowerCase().trim());
    const search = searchBox.value.toLowerCase().trim();

    let visibleCount = 0;

    events.forEach(card => {
      const cardType = (card.dataset.type || "").toLowerCase().trim();
      const cardClub = (card.dataset.club || "").toLowerCase().trim();
      const cardText = card.innerText.toLowerCase();

      const matchType = selectedTypes.length === 0 || selectedTypes.includes(cardType);
      const matchClub = selectedClubs.length === 0 || selectedClubs.includes(cardClub);
      const matchSearch = search === "" || cardText.includes(search);

      if (matchType && matchClub && matchSearch) {
        card.style.display = "flex"; // keep visible
        visibleCount++;
      } else {
        card.style.display = "none"; // hide
      }
    });

    noEventsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Filter listeners
  document.querySelector(".sidebar")?.addEventListener("change", e => {
    if (e.target.matches(".filter-type, .filter-club")) {
      filterEvents();
    }
  });

  searchBox.addEventListener("input", filterEvents);

  // Click handling (event delegation)
  container.addEventListener("click", e => {
    const card = e.target.closest(".event-card");
    if (card && container.contains(card) && card.style.display !== "none") {
      const id = card.dataset.id;
      if (id) {
        window.location.href = `event-details.html?id=${id}`;
      }
    }
  });

  // Initial filter run
  filterEvents();
});


// =========================
// Event Details (only on event-details.html)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("event-details-page")) return;

  const container = document.getElementById("event-details-container");

  // Parse query params
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Event Data
  const eventsData = {
    "2fast2hack": {
      title: "2FAST2HACK",
      club: "Google Developers Student Club",
      desc: "Compete in teams to build innovative solutions in 24 hours.",
      type: "competition",
      venue: "Main Auditorium",
      contact: "gds@example.com",
      team: "Teams of 3-4"
    },
    "code-sprint": {
      title: "Code Sprint",
      club: "Codex",
      desc: "Solve algorithmic problems under time pressure.",
      type: "competition",
      venue: "Lab 2",
      contact: "codex@example.com",
      team: "Individual Participation"
    },
    "blockchain-101": {
      title: "Blockchain 101",
      club: "Cyber Blockchain Club",
      desc: "Introductory workshop covering concepts & hands-on exercises.",
      type: "workshop",
      venue: "Seminar Hall",
      contact: "cbc@example.com"
    },
    "space-talk": {
      title: "Space Talk",
      club: "Antriksh Club",
      desc: "Guest lecture by an ISRO scientist about space exploration.",
      type: "lecture",
      venue: "Conference Room B",
      contact: "antriksh@example.com",
      guest: "Dr. A. Scientist"
    },
    "acm-hacknight": {
      title: "HackNight",
      club: "ACM Student Chapter",
      desc: "An overnight coding marathon solving real-world challenges.",
      type: "competition",
      venue: "Computer Lab Block C",
      contact: "acm@example.com",
      team: "Teams of 2-3"
    },
    "varsity-care-ai": {
      title: "AI for Healthcare",
      club: "Varsity Care",
      desc: "Workshop exploring applications of AI in medical diagnostics.",
      type: "workshop",
      venue: "Innovation Lab",
      contact: "varsity@example.com"
    }
  };

  const event = eventsData[id];
  if (!event) {
    container.innerHTML = "<p>Event not found.</p>";
    return;
  }

  // Render different layouts
  if (event.type === "competition" || event.type === "workshop") {
    container.innerHTML = `
      <div class="event-layout ${event.type}-layout">
        <h1>${event.title}</h1>
        <h3>${event.club}</h3>
        <div class="event-graphic">Event Graphic</div>
        <div class="event-description">${event.desc}</div>
        <div class="event-meta">
          <div class="venue"><strong>Venue:</strong> ${event.venue}</div>
          <div class="contact"><strong>Contact:</strong> ${event.contact}</div>
          <div class="team"><strong>Team Size:</strong> ${event.team || "Individual"}</div>
        </div>
        <button class="register-btn">REGISTER</button>
      </div>
    `;
  } else if (event.type === "lecture") {
    container.innerHTML = `
      <div class="event-layout lecture-layout">
        <h1>${event.title}</h1>
        <h3>${event.guest}</h3>
        <div class="lecturer-photo">Lecturer Photo</div>
        <div class="event-about">About the event</div>
        <div class="event-description">${event.desc}</div>
        <div class="event-meta">
          <div class="venue"><strong>Venue:</strong> ${event.venue}</div>
          <div class="contact"><strong>Contact:</strong> ${event.contact}</div>
        </div>
        <button class="register-btn">REGISTER</button>
      </div>
    `;
  }
});


// =========================
// Back button
// =========================
function goBack() {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = "index.html"; // fallback
  }
}
