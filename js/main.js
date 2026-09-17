/**
 * SL-CLASSES Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger bars
      menuToggle.classList.toggle('open');
    });
  }

  // Mobile Dropdown Click Handler
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // 2. Program Section Interactive Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active state from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Hide all tab content panes
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active state to clicked button
        button.classList.add('active');

        // Show corresponding target pane
        const targetId = button.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // 3. Animated Counter for Impact Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    let hasAnimated = false;

    const animateCounters = () => {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const speed = 200; // Counter speed
        const increment = Math.ceil(target / speed) || 1;

        let count = 0;
        const updateCount = () => {
          count += increment;
          if (count < target) {
            stat.innerText = count;
            setTimeout(updateCount, 15);
          } else {
            stat.innerText = target;
          }
        };

        updateCount();
      });
    };

    // Scroll Observer for Counter Section
    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          hasAnimated = true;
        }
      }, { threshold: 0.5 });

      observer.observe(statsSection);
    }
  }

  // 4. Image Fallback Handling
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Set a neutral SVG fallback image if missing
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2364748b">Image Preview</text></svg>';
    });
  });

});
// ==========================================
  // Language School Specific Scripts
  // ==========================================

  // 1. Language Course Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  // 2. Curriculum Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const accordionContent = accordionItem.querySelector('.accordion-content');
      const isActive = accordionItem.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const content = item.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      // If clicked item was not active, open it
      if (!isActive) {
        accordionItem.classList.add('active');
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      }
    });
  });

  // 3. Tuition Fee Quick Calculator
  const calcForm = document.getElementById('fee-calculator-form');
  const langSelect = document.getElementById('calc-language');
  const modeSelect = document.getElementById('calc-mode');
  const levelSelect = document.getElementById('calc-level');
  const totalPriceDisplay = document.getElementById('total-price');

  if (calcForm && langSelect && modeSelect && levelSelect && totalPriceDisplay) {
    const calculateFee = () => {
      const baseFee = parseFloat(langSelect.value);
      const modeMultiplier = parseFloat(modeSelect.value);
      const durationMultiplier = parseInt(levelSelect.value, 10);

      const total = Math.round(baseFee * modeMultiplier * durationMultiplier);
      totalPriceDisplay.textContent = `ZMW ${total.toLocaleString()}`;
    };

    langSelect.addEventListener('change', calculateFee);
    modeSelect.addEventListener('change', calculateFee);
    levelSelect.addEventListener('change', calculateFee);
  }
  // ==========================================
  // Sign Language Page Interactive Scripts
  // ==========================================

  // 1. Gesture Flashcard Highlight Effect
  const gestureCards = document.querySelectorAll('.gesture-card');
  gestureCards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle card active border highlight
      card.style.borderColor = card.style.borderColor === 'var(--secondary)' ? 'var(--border-color)' : 'var(--secondary)';
    });
  });

  // 2. Video Modal Script
  const openVideoBtn = document.getElementById('open-video-btn');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const videoModal = document.getElementById('video-modal');

  if (openVideoBtn && closeVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
    });

    closeVideoBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });

    // Close on outside overlay click
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }
  // ==========================================
  // Local Languages Hub Search & Filter
  // ==========================================

  const searchInput = document.getElementById('language-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const languageCards = document.querySelectorAll('.language-card');
  const noResults = document.getElementById('no-results');
  const resetBtn = document.getElementById('reset-filter');

  if (languageCards.length > 0) {
    let currentRegion = 'all';
    let currentQuery = '';

    function filterLanguages() {
      let visibleCount = 0;

      languageCards.forEach(card => {
        const cardRegion = card.getAttribute('data-region');
        const cardText = card.textContent.toLowerCase();

        const matchesRegion = (currentRegion === 'all' || cardRegion === currentRegion);
        const matchesQuery = cardText.includes(currentQuery.toLowerCase());

        if (matchesRegion && matchesQuery) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        if (visibleCount === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }
      }
    }

    // Filter Buttons Click Listener
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRegion = btn.getAttribute('data-region');
        filterLanguages();
      });
    });

    // Search Input Listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value.trim();
        filterLanguages();
      });
    }

    // Reset Filters Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentRegion = 'all';
        currentQuery = '';
        if (searchInput) searchInput.value = '';
        filterBtns.forEach(b => b.classList.remove('active'));
        if (filterBtns[0]) filterBtns[0].classList.add('active');
        filterLanguages();
      });
    }
  }
  // ==========================================
  // Lozi Course Audio & Modal Script
  // ==========================================

  // 1. Audio Phrase Buttons Trigger
  const audioBtns = document.querySelectorAll('.audio-btn');
  const activePhraseDisplay = document.getElementById('active-phrase-display');
  const waveVisualizer = document.querySelector('.audio-wave-visualizer');

  audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.vocab-card');
      const loziText = parentCard.querySelector('.vocab-lozi').textContent;
      
      // Open modal with selected phrase context
      if (videoModal || document.getElementById('audio-modal')) {
        const audioModal = document.getElementById('audio-modal');
        if (audioModal) {
          audioModal.classList.add('active');
          if (activePhraseDisplay) {
            activePhraseDisplay.textContent = `Pronouncing: ${loziText}`;
          }
        }
      }
    });
  });

  // 2. Audio Sampler Modal Controls
  const openAudioBtn = document.getElementById('open-audio-preview');
  const closeAudioBtn = document.getElementById('close-audio-btn');
  const audioModal = document.getElementById('audio-modal');
  const playSampleBtn = document.getElementById('play-sample-btn');

  if (openAudioBtn && audioModal) {
    openAudioBtn.addEventListener('click', () => {
      audioModal.classList.add('active');
      if (activePhraseDisplay) {
        activePhraseDisplay.textContent = "Click play to listen to Silozi phrase samples";
      }
    });
  }

  if (closeAudioBtn && audioModal) {
    closeAudioBtn.addEventListener('click', () => {
      audioModal.classList.remove('active');
      if (waveVisualizer) waveVisualizer.classList.remove('playing');
      if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
    });

    audioModal.addEventListener('click', (e) => {
      if (e.target === audioModal) {
        audioModal.classList.remove('active');
        if (waveVisualizer) waveVisualizer.classList.remove('playing');
        if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }

  // 3. Play/Pause Toggle Simulation
  if (playSampleBtn && waveVisualizer) {
    let isPlaying = false;

    playSampleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        waveVisualizer.classList.add('playing');
        playSampleBtn.textContent = '⏸ Pause';
        if (activePhraseDisplay && activePhraseDisplay.textContent.includes('Click play')) {
          activePhraseDisplay.textContent = 'Playing: "Muzuweha cwani?"';
        }
      } else {
        waveVisualizer.classList.remove('playing');
        playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }
  // ==========================================
  // Local Language Audio & Modal Script
  // ==========================================

  const audioBtns = document.querySelectorAll('.audio-btn');
  const activePhraseDisplay = document.getElementById('active-phrase-display');
  const waveVisualizer = document.querySelector('.audio-wave-visualizer');
  const audioModal = document.getElementById('audio-modal');

  audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.vocab-card');
      const phraseText = parentCard.querySelector('.vocab-lozi').textContent;
      
      if (audioModal) {
        audioModal.classList.add('active');
        if (activePhraseDisplay) {
          activePhraseDisplay.textContent = `Pronouncing: ${phraseText}`;
        }
      }
    });
  });

  const openAudioBtn = document.getElementById('open-audio-preview');
  const closeAudioBtn = document.getElementById('close-audio-btn');
  const playSampleBtn = document.getElementById('play-sample-btn');

  if (openAudioBtn && audioModal) {
    openAudioBtn.addEventListener('click', () => {
      audioModal.classList.add('active');
      if (activePhraseDisplay) {
        activePhraseDisplay.textContent = "Click play to listen to phrase samples";
      }
    });
  }

  if (closeAudioBtn && audioModal) {
    closeAudioBtn.addEventListener('click', () => {
      audioModal.classList.remove('active');
      if (waveVisualizer) waveVisualizer.classList.remove('playing');
      if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
    });

    audioModal.addEventListener('click', (e) => {
      if (e.target === audioModal) {
        audioModal.classList.remove('active');
        if (waveVisualizer) waveVisualizer.classList.remove('playing');
        if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }

  if (playSampleBtn && waveVisualizer) {
    let isPlaying = false;

    playSampleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        waveVisualizer.classList.add('playing');
        playSampleBtn.textContent = '⏸ Pause';
        if (activePhraseDisplay && activePhraseDisplay.textContent.includes('Click play')) {
          activePhraseDisplay.textContent = 'Playing: "Mwayuka ngachilihi?"';
        }
      } else {
        waveVisualizer.classList.remove('playing');
        playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // Local Language Audio & Modal Handler
  // ==========================================
  const audioBtns = document.querySelectorAll('.audio-btn');
  const activePhraseDisplay = document.getElementById('active-phrase-display');
  const waveVisualizer = document.querySelector('.audio-wave-visualizer');
  const audioModal = document.getElementById('audio-modal');

  audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.vocab-card');
      const phraseText = parentCard.querySelector('.vocab-lozi').textContent;
      
      if (audioModal) {
        audioModal.classList.add('active');
        if (activePhraseDisplay) {
          activePhraseDisplay.textContent = `Pronouncing: ${phraseText}`;
        }
      }
    });
  });

  const openAudioBtn = document.getElementById('open-audio-preview');
  const closeAudioBtn = document.getElementById('close-audio-btn');
  const playSampleBtn = document.getElementById('play-sample-btn');

  if (openAudioBtn && audioModal) {
    openAudioBtn.addEventListener('click', () => {
      audioModal.classList.add('active');
      if (activePhraseDisplay) {
        activePhraseDisplay.textContent = 'Click play to listen to phrase samples';
      }
    });
  }

  if (closeAudioBtn && audioModal) {
    closeAudioBtn.addEventListener('click', () => {
      audioModal.classList.remove('active');
      if (waveVisualizer) waveVisualizer.classList.remove('playing');
      if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
    });

    audioModal.addEventListener('click', (e) => {
      if (e.target === audioModal) {
        audioModal.classList.remove('active');
        if (waveVisualizer) waveVisualizer.classList.remove('playing');
        if (playSampleBtn) playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }

  if (playSampleBtn && waveVisualizer) {
    let isPlaying = false;

    playSampleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        waveVisualizer.classList.add('playing');
        playSampleBtn.textContent = '⏸ Pause';
        if (activePhraseDisplay && activePhraseDisplay.textContent.includes('Click play')) {
          activePhraseDisplay.textContent = 'Playing: "Mwapoleni mukwai"';
        }
      } else {
        waveVisualizer.classList.remove('playing');
        playSampleBtn.textContent = '▶ Play Sample';
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Booking Form Parameter Auto-Select & Handling
  // ==========================================
  const bookingForm = document.getElementById('interpreter-booking-form');
  const serviceSelect = document.getElementById('service_type');
  const successMsg = document.getElementById('booking-success-msg');

  // Auto-fill service from URL query params (e.g. booking.html?service=sign-language)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedService = urlParams.get('service');

  if (selectedService && serviceSelect) {
    if (selectedService === 'sign-language') serviceSelect.value = 'sign-language';
    else if (selectedService === 'local-languages') serviceSelect.value = 'bemba';
    else if (selectedService === 'legal') serviceSelect.value = 'sign-language';
    else if (selectedService === 'conference') serviceSelect.value = 'multiple';
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-booking-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      // Simulate API submission
      setTimeout(() => {
        bookingForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Booking Request';
        }
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1000);
    });
  }
});
/**
 * SL-CLASSES - Main Application Logic & Interpreter Directory Engine
 */

// Sample Data Set tailored for SL-CLASSES (Zambian Local & Sign Language Interpreters)
const interpreterDirectory = [
  {
    id: "INT-101",
    name: "Mubita Akapelwa",
    location: "Mongu, Western Province",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K250",
    status: "available", // available | on-call | booked
    languages: ["Lozi", "Zambian Sign Language", "English"],
    specialties: ["Legal", "Community"]
  },
  {
    id: "INT-102",
    name: "Chanda Chisala",
    location: "Lusaka, Lusaka Province",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K300",
    status: "available",
    languages: ["Bemba", "Nyanja", "English"],
    specialties: ["Conference", "Medical"]
  },
  {
    id: "INT-103",
    name: "Kavula Samalesu",
    location: "Solwezi, North-Western Province",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K220",
    status: "on-call",
    languages: ["Luvale", "English"],
    specialties: ["Educational", "Community"]
  },
  {
    id: "INT-104",
    name: "Grace Nakawala",
    location: "Ndola, Copperbelt Province",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K280",
    status: "available",
    languages: ["Zambian Sign Language", "Bemba", "English"],
    specialties: ["Educational", "Medical"]
  },
  {
    id: "INT-105",
    name: "Siyoto Liswaniso",
    location: "Mongu, Western Province",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K260",
    status: "booked",
    languages: ["Lozi", "Luvale", "English"],
    specialties: ["Legal", "Conference"]
  }
];

// Active state selection for modal operations
let selectedInterpreter = null;

// DOM Element References
document.addEventListener("DOMContentLoaded", () => {
  // Navigation elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  // Mobile Menu Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // Directory UI Elements
  const grid = document.getElementById("interpretersGrid");
  const searchInput = document.getElementById("searchInput");
  const languageFilter = document.getElementById("languageFilter");
  const specialtyFilter = document.getElementById("specialtyFilter");
  const statusFilter = document.getElementById("statusFilter");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const counter = document.getElementById("resultsCounter");

  // Modal Elements
  const modal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");

  // Initial Directory Render
  if (grid) {
    renderDirectory(interpreterDirectory);

    // Event Listeners for Filters
    searchInput.addEventListener("input", filterDirectory);
    languageFilter.addEventListener("change", filterDirectory);
    specialtyFilter.addEventListener("change", filterDirectory);
    statusFilter.addEventListener("change", filterDirectory);

    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      languageFilter.value = "";
      specialtyFilter.value = "";
      statusFilter.value = "";
      renderDirectory(interpreterDirectory);
    });
  }

  // Modal Listeners
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      if (selectedInterpreter) {
        // Redirect to booking page carrying interpreter parameters
        window.location.href = `booking.html?interpreterId=${selectedInterpreter.id}&name=${encodeURIComponent(selectedInterpreter.name)}`;
      }
    });
  }

  /**
   * Render Interpreter Cards into DOM
   */
  function renderDirectory(data) {
    grid.innerHTML = "";

    if (data.length === 0) {
      grid.innerHTML = `
        <div class="no-data">
          <h3>No interpreters matched your query</h3>
          <p>Try resetting filters or adjusting search parameters.</p>
        </div>
      `;
      counter.textContent = "0 interpreters found";
      return;
    }

    counter.textContent = `Showing ${data.length} registered interpreter${data.length > 1 ? 's' : ''}`;

    data.forEach(item => {
      const card = document.createElement("article");
      card.className = "interpreter-card";

      const statusClass = item.status === "available" 
        ? "status-available" 
        : item.status === "on-call" ? "status-on-call" : "status-booked";

      const statusLabel = item.status === "available" 
        ? "Available" 
        : item.status === "on-call" ? "On Call" : "Booked";

      card.innerHTML = `
        <div>
          <div class="card-top">
            <img src="${item.avatar}" alt="${item.name}" class="avatar-img">
            <div class="profile-meta">
              <h3 class="profile-name">${item.name}</h3>
              <p class="profile-location">📍 ${item.location}</p>
              <p class="profile-rate">${item.ratePerHour} / hr</p>
            </div>
            <span class="status-badge ${statusClass}">${statusLabel}</span>
          </div>

          <div class="tag-section">
            <div class="section-label">Languages</div>
            <div class="tags-wrapper">
              ${item.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
            </div>
          </div>

          <div class="tag-section">
            <div class="section-label">Specialties</div>
            <div class="tags-wrapper">
              ${item.specialties.map(spec => `<span class="tag tag-specialty">${spec}</span>`).join('')}
            </div>
          </div>
        </div>

        <button 
          class="btn-primary btn-block ${item.status === 'booked' ? 'btn-disabled' : ''}" 
          ${item.status === 'booked' ? 'disabled' : ''}
          data-id="${item.id}"
        >
          ${item.status === 'booked' ? 'Currently Unavailable' : 'Request Booking'}
        </button>
      `;

      // Attach button click event
      const actionBtn = card.querySelector("button");
      if (item.status !== 'booked') {
        actionBtn.addEventListener("click", () => openModal(item));
      }

      grid.appendChild(card);
    });
  }

  /**
   * Filter Dataset based on controls
   */
  function filterDirectory() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedLang = languageFilter.value;
    const selectedSpec = specialtyFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = interpreterDirectory.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.languages.some(l => l.toLowerCase().includes(query));

      const matchesLang = selectedLang === "" || item.languages.includes(selectedLang);
      const matchesSpec = selectedSpec === "" || item.specialties.includes(selectedSpec);
      const matchesStatus = selectedStatus === "" || item.status === selectedStatus;

      return matchesSearch && matchesLang && matchesSpec && matchesStatus;
    });

    renderDirectory(filtered);
  }

  /**
   * Modal Display Management
   */
  function openModal(interpreter) {
    selectedInterpreter = interpreter;
    document.getElementById("modalTitle").textContent = `Request ${interpreter.name}`;
    document.getElementById("modalInfoBox").innerHTML = `
      <strong>Interpreter ID:</strong> ${interpreter.id}<br>
      <strong>Languages:</strong> ${interpreter.languages.join(", ")}<br>
      <strong>Base Rate:</strong> ${interpreter.ratePerHour}/hr
    `;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    selectedInterpreter = null;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});
  /**
 * SL-CLASSES - Main Application Logic
 * Covers Directory Search, Interpreter Training Program Tracks, and Accordion Controls
 */

// 1. Interpreter Directory Sample Data
const interpreterDirectory = [
  {
    id: "INT-101",
    name: "Mubita Akapelwa",
    location: "Mongu, Western Province",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K250",
    status: "available",
    languages: ["Lozi", "Zambian Sign Language", "English"],
    specialties: ["Legal", "Community"]
  },
  {
    id: "INT-102",
    name: "Chanda Chisala",
    location: "Lusaka, Lusaka Province",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K300",
    status: "available",
    languages: ["Bemba", "Nyanja", "English"],
    specialties: ["Conference", "Medical"]
  },
  {
    id: "INT-103",
    name: "Kavula Samalesu",
    location: "Solwezi, North-Western Province",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K220",
    status: "on-call",
    languages: ["Luvale", "English"],
    specialties: ["Educational", "Community"]
  },
  {
    id: "INT-104",
    name: "Grace Nakawala",
    location: "Ndola, Copperbelt Province",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K280",
    status: "available",
    languages: ["Zambian Sign Language", "Bemba", "English"],
    specialties: ["Educational", "Medical"]
  },
  {
    id: "INT-105",
    name: "Siyoto Liswaniso",
    location: "Mongu, Western Province",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    ratePerHour: "K260",
    status: "booked",
    languages: ["Lozi", "Luvale", "English"],
    specialties: ["Legal", "Conference"]
  }
];

// 2. Training Courses Sample Data
const trainingCourses = [
  {
    id: "TR-ZSL1",
    track: "zsl",
    title: "Certificate in Zambian Sign Language (ZSL) Interpretation",
    duration: "6 Months",
    fee: "K3,500 / term",
    badge: "Sign Language Track",
    description: "Comprehensive training in ZSL handshapes, facial expressions, spatial grammar, deaf culture, and consecutive interpreting."
  },
  {
    id: "TR-LOC1",
    track: "local",
    title: "Indigenous Languages Professional Interpreter Certificate",
    duration: "4 Months",
    fee: "K2,800 / term",
    badge: "Local Languages Track",
    description: "Specialized focus on high-demand languages including Lozi, Bemba, Luvale, and Nyanja for civic and social services."
  },
  {
    id: "TR-ADV1",
    track: "advanced",
    title: "Advanced Legal & Court Interpretation Masterclass",
    duration: "3 Months",
    fee: "K4,200",
    badge: "Specialized & Legal Track",
    description: "Designed for practicing interpreters seeking court accreditation. Focuses on judicial proceedings, witness statements, and legal terminology."
  },
  {
    id: "TR-ADV2",
    track: "advanced",
    title: "Medical & Healthcare Interpretation Certification",
    duration: "3 Months",
    fee: "K3,800",
    badge: "Specialized & Legal Track",
    description: "Covers medical diagnosis terminology, clinical communication ethics, patient privacy, and emergency healthcare interpretation."
  }
];

let selectedInterpreter = null;
let selectedCourse = null;

document.addEventListener("DOMContentLoaded", () => {
  // Navigation Menu Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // --- Interpreter Directory Logic (interpreter.html) ---
  const grid = document.getElementById("interpretersGrid");
  const searchInput = document.getElementById("searchInput");
  const languageFilter = document.getElementById("languageFilter");
  const specialtyFilter = document.getElementById("specialtyFilter");
  const statusFilter = document.getElementById("statusFilter");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const counter = document.getElementById("resultsCounter");

  if (grid) {
    renderDirectory(interpreterDirectory);

    searchInput.addEventListener("input", filterDirectory);
    languageFilter.addEventListener("change", filterDirectory);
    specialtyFilter.addEventListener("change", filterDirectory);
    statusFilter.addEventListener("change", filterDirectory);

    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      languageFilter.value = "";
      specialtyFilter.value = "";
      statusFilter.value = "";
      renderDirectory(interpreterDirectory);
    });
  }

  function renderDirectory(data) {
    grid.innerHTML = "";
    if (data.length === 0) {
      grid.innerHTML = `<div class="no-data"><h3>No interpreters matched your query</h3><p>Try resetting filters.</p></div>`;
      counter.textContent = "0 interpreters found";
      return;
    }

    counter.textContent = `Showing ${data.length} registered interpreter${data.length > 1 ? 's' : ''}`;

    data.forEach(item => {
      const card = document.createElement("article");
      card.className = "interpreter-card";
      const statusClass = item.status === "available" ? "status-available" : item.status === "on-call" ? "status-on-call" : "status-booked";
      const statusLabel = item.status === "available" ? "Available" : item.status === "on-call" ? "On Call" : "Booked";

      card.innerHTML = `
        <div>
          <div class="card-top">
            <img src="${item.avatar}" alt="${item.name}" class="avatar-img">
            <div class="profile-meta">
              <h3 class="profile-name">${item.name}</h3>
              <p class="profile-location">📍 ${item.location}</p>
              <p class="profile-rate">${item.ratePerHour} / hr</p>
            </div>
            <span class="status-badge ${statusClass}">${statusLabel}</span>
          </div>

          <div class="tag-section">
            <div class="section-label">Languages</div>
            <div class="tags-wrapper">${item.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}</div>
          </div>

          <div class="tag-section">
            <div class="section-label">Specialties</div>
            <div class="tags-wrapper">${item.specialties.map(spec => `<span class="tag tag-specialty">${spec}</span>`).join('')}</div>
          </div>
        </div>

        <button class="btn-primary btn-block ${item.status === 'booked' ? 'btn-disabled' : ''}" ${item.status === 'booked' ? 'disabled' : ''}>
          ${item.status === 'booked' ? 'Currently Unavailable' : 'Request Booking'}
        </button>
      `;

      const actionBtn = card.querySelector("button");
      if (item.status !== 'booked') {
        actionBtn.addEventListener("click", () => openBookingModal(item));
      }

      grid.appendChild(card);
    });
  }

  function filterDirectory() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedLang = languageFilter.value;
    const selectedSpec = specialtyFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = interpreterDirectory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query) || item.languages.some(l => l.toLowerCase().includes(query));
      const matchesLang = selectedLang === "" || item.languages.includes(selectedLang);
      const matchesSpec = selectedSpec === "" || item.specialties.includes(selectedSpec);
      const matchesStatus = selectedStatus === "" || item.status === selectedStatus;
      return matchesSearch && matchesLang && matchesSpec && matchesStatus;
    });

    renderDirectory(filtered);
  }

  // --- Booking Modal Operations ---
  const bookingModal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeBookingModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeBookingModal);
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      if (selectedInterpreter) {
        window.location.href = `booking.html?interpreterId=${selectedInterpreter.id}&name=${encodeURIComponent(selectedInterpreter.name)}`;
      }
    });
  }

  function openBookingModal(interpreter) {
    selectedInterpreter = interpreter;
    document.getElementById("modalTitle").textContent = `Request ${interpreter.name}`;
    document.getElementById("modalInfoBox").innerHTML = `
      <strong>Interpreter ID:</strong> ${interpreter.id}<br>
      <strong>Languages:</strong> ${interpreter.languages.join(", ")}<br>
      <strong>Base Rate:</strong> ${interpreter.ratePerHour}/hr
    `;
    bookingModal.classList.add("active");
    bookingModal.setAttribute("aria-hidden", "false");
  }

  function closeBookingModal() {
    selectedInterpreter = null;
    if (bookingModal) {
      bookingModal.classList.remove("active");
      bookingModal.setAttribute("aria-hidden", "true");
    }
  }


  // --- Training Program Logic (interpreter-training.html) ---
  const trainingGrid = document.getElementById("trainingCoursesGrid");
  const trackBtns = document.querySelectorAll(".track-btn");

  if (trainingGrid) {
    renderCourses(trainingCourses);

    trackBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        trackBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const track = btn.getAttribute("data-track");

        if (track === "all") {
          renderCourses(trainingCourses);
        } else {
          const filtered = trainingCourses.filter(c => c.track === track);
          renderCourses(filtered);
        }
      });
    });
  }

  function renderCourses(courses) {
    trainingGrid.innerHTML = "";
    courses.forEach(course => {
      const card = document.createElement("article");
      card.className = "course-card";
      card.innerHTML = `
        <div>
          <span class="course-badge">${course.badge}</span>
          <h3 class="course-title">${course.title}</h3>
          <div class="course-meta-info">
            <span><strong>Duration:</strong> ${course.duration}</span>
            <span><strong>Tuition:</strong> ${course.fee}</span>
          </div>
          <p class="course-description">${course.description}</p>
        </div>
        <button class="btn-primary btn-block enroll-btn">Apply / Enroll Now</button>
      `;

      card.querySelector(".enroll-btn").addEventListener("click", () => openEnrollModal(course));
      trainingGrid.appendChild(card);
    });
  }

  // --- Curriculum Accordion Controls ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
    });
  });

  // --- Enrollment Modal Operations ---
  const enrollModal = document.getElementById("enrollmentModal");
  const closeEnrollModalBtn = document.getElementById("closeEnrollModalBtn");
  const cancelEnrollBtn = document.getElementById("cancelEnrollBtn");
  const confirmEnrollBtn = document.getElementById("confirmEnrollBtn");

  if (closeEnrollModalBtn) closeEnrollModalBtn.addEventListener("click", closeEnrollModal);
  if (cancelEnrollBtn) cancelEnrollBtn.addEventListener("click", closeEnrollModal);
  if (confirmEnrollBtn) {
    confirmEnrollBtn.addEventListener("click", () => {
      if (selectedCourse) {
        window.location.href = `class-registration.html?courseId=${selectedCourse.id}&title=${encodeURIComponent(selectedCourse.title)}`;
      }
    });
  }

  function openEnrollModal(course) {
    selectedCourse = course;
    document.getElementById("enrollModalTitle").textContent = `Enrollment Application`;
    document.getElementById("enrollModalInfoBox").innerHTML = `
      <strong>Course:</strong> ${course.title}<br>
      <strong>Duration:</strong> ${course.duration}<br>
      <strong>Tuition Fee:</strong> ${course.fee}
    `;
    enrollModal.classList.add("active");
    enrollModal.setAttribute("aria-hidden", "false");
  }

  function closeEnrollModal() {
    selectedCourse = null;
    if (enrollModal) {
      enrollModal.classList.remove("active");
      enrollModal.setAttribute("aria-hidden", "true");
    }
  }
});
// --- Membership Pricing Toggle Logic (membership.html) ---
  const billingToggle = document.getElementById("billingToggle");
  const priceElements = document.querySelectorAll(".plan-price");
  const selectPlanBtns = document.querySelectorAll(".select-plan-btn");

  if (billingToggle) {
    billingToggle.addEventListener("change", () => {
      const isAnnual = billingToggle.checked;

      priceElements.forEach(priceEl => {
        const monthlyPrice = priceEl.getAttribute("data-monthly");
        const annualPrice = priceEl.getAttribute("data-annual");
        const amountSpan = priceEl.querySelector(".amount");
        const periodSpan = priceEl.querySelector(".period");

        if (isAnnual) {
          amountSpan.textContent = annualPrice;
          periodSpan.textContent = "/year";
        } else {
          amountSpan.textContent = monthlyPrice;
          periodSpan.textContent = "/month";
        }
      });
    });
  }

  // --- Membership Modal Logic ---
  const membershipModal = document.getElementById("membershipModal");
  const closeMembershipModalBtn = document.getElementById("closeMembershipModalBtn");
  const cancelMembershipBtn = document.getElementById("cancelMembershipBtn");
  const confirmMembershipBtn = document.getElementById("confirmMembershipBtn");
  let selectedPlanData = null;

  if (selectPlanBtns.length > 0) {
    selectPlanBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".pricing-card");
        const planName = btn.getAttribute("data-plan");
        const isAnnual = billingToggle ? billingToggle.checked : false;
        const priceEl = card.querySelector(".plan-price");
        const currentPrice = isAnnual ? priceEl.getAttribute("data-annual") : priceEl.getAttribute("data-monthly");
        const cycle = isAnnual ? "Annual Billing" : "Monthly Billing";

        selectedPlanData = {
          planName: planName,
          price: currentPrice,
          cycle: cycle
        };

        openMembershipModal(selectedPlanData);
      });
    });
  }

  if (closeMembershipModalBtn) closeMembershipModalBtn.addEventListener("click", closeMembershipModal);
  if (cancelMembershipBtn) cancelMembershipBtn.addEventListener("click", closeMembershipModal);
  if (confirmMembershipBtn) {
    confirmMembershipBtn.addEventListener("click", () => {
      if (selectedPlanData) {
        window.location.href = `get-started.html?plan=${encodeURIComponent(selectedPlanData.planName)}&cycle=${encodeURIComponent(selectedPlanData.cycle)}`;
      }
    });
  }

  function openMembershipModal(data) {
    document.getElementById("modalPlanTitle").textContent = `Selected: ${data.planName}`;
    document.getElementById("membershipModalDetails").innerHTML = `
      <strong>Tier:</strong> ${data.planName}<br>
      <strong>Billing Rate:</strong> ${data.price}<br>
      <strong>Billing Cycle:</strong> ${data.cycle}
    `;
    membershipModal.classList.add("active");
    membershipModal.setAttribute("aria-hidden", "false");
  }

  function closeMembershipModal() {
    selectedPlanData = null;
    if (membershipModal) {
      membershipModal.classList.remove("active");
      membershipModal.setAttribute("aria-hidden", "true");
    }
  }
  // --- Skills Centre Sample Data ---
  const skillsPrograms = [
    {
      id: "SK-DIG1",
      category: "digital",
      categoryLabel: "Digital Literacy",
      title: "Essential Digital Literacy & Computer Fundamentals",
      mode: "Physical",
      duration: "4 Weeks",
      fee: "K800",
      prereq: "None - Open to beginners",
      description: "Master computer navigation, web browsing, email communication, document typing, and cloud file management."
    },
    {
      id: "SK-WEB1",
      category: "web",
      categoryLabel: "Web Development",
      title: "Front-End Web Development (HTML, CSS, JavaScript)",
      mode: "Hybrid",
      duration: "12 Weeks",
      fee: "K2,500",
      prereq: "Basic computer literacy",
      description: "Build modern, accessible websites using responsive layout techniques, CSS flexbox/grid, and modern JavaScript logic."
    },
    {
      id: "SK-DES1",
      category: "design",
      categoryLabel: "Graphics & Branding",
      title: "Graphic Design & Brand Identity Creation",
      mode: "Online",
      duration: "8 Weeks",
      fee: "K1,800",
      prereq: "Basic computer familiarity",
      description: "Learn typography, logo design, marketing flyer layouts, image editing, and digital design tools for commercial clients."
    },
    {
      id: "SK-BUS1",
      category: "business",
      categoryLabel: "Entrepreneurship",
      title: "Digital Marketing & Local Small Business Operations",
      mode: "Physical",
      duration: "6 Weeks",
      fee: "K1,500",
      prereq: "None",
      description: "Practical training in social media strategy, customer messaging, simple bookkeeping, and local order dispatch management."
    }
  ];

  let selectedSkillProgram = null;

  // --- Skills Centre UI Elements ---
  const skillsGrid = document.getElementById("skillsGrid");
  const skillSearchInput = document.getElementById("skillSearchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const modeFilter = document.getElementById("modeFilter");
  const resetSkillsBtn = document.getElementById("resetSkillsFiltersBtn");
  const skillsCounter = document.getElementById("skillsCounter");

  if (skillsGrid) {
    renderSkills(skillsPrograms);

    skillSearchInput.addEventListener("input", filterSkills);
    categoryFilter.addEventListener("change", filterSkills);
    modeFilter.addEventListener("change", filterSkills);

    if (resetSkillsBtn) {
      resetSkillsBtn.addEventListener("click", () => {
        skillSearchInput.value = "";
        categoryFilter.value = "";
        modeFilter.value = "";
        renderSkills(skillsPrograms);
      });
    }
  }

  function renderSkills(data) {
    skillsGrid.innerHTML = "";
    if (data.length === 0) {
      skillsGrid.innerHTML = `<div class="no-data"><h3>No skills programs found</h3><p>Try clearing your search query or filters.</p></div>`;
      skillsCounter.textContent = "0 programs found";
      return;
    }

    skillsCounter.textContent = `Showing ${data.length} skill program${data.length > 1 ? 's' : ''}`;

    data.forEach(item => {
      const card = document.createElement("article");
      card.className = "skill-card";
      card.innerHTML = `
        <div>
          <span class="skill-category-tag">${item.categoryLabel}</span>
          <h3 class="skill-title">${item.title}</h3>
          <div class="skill-meta">
            <span><strong>Format:</strong> ${item.mode}</span>
            <span><strong>Duration:</strong> ${item.duration}</span>
            <span><strong>Tuition:</strong> ${item.fee}</span>
          </div>
          <p class="skill-description">${item.description}</p>
          <div class="skill-prereq"><strong>Prerequisite:</strong> ${item.prereq}</div>
        </div>
        <button class="btn-primary btn-block apply-skill-btn">Register for Skill Course</button>
      `;

      card.querySelector(".apply-skill-btn").addEventListener("click", () => openSkillsModal(item));
      skillsGrid.appendChild(card);
    });
  }

  function filterSkills() {
    const query = skillSearchInput.value.toLowerCase().trim();
    const selectedCat = categoryFilter.value;
    const selectedMode = modeFilter.value;

    const filtered = skillsPrograms.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
      const matchesCat = selectedCat === "" || item.category === selectedCat;
      const matchesMode = selectedMode === "" || item.mode === selectedMode;
      return matchesSearch && matchesCat && matchesMode;
    });

    renderSkills(filtered);
  }

  // --- Skills Modal Operations ---
  const skillsModal = document.getElementById("skillsModal");
  const closeSkillsModalBtn = document.getElementById("closeSkillsModalBtn");
  const cancelSkillsBtn = document.getElementById("cancelSkillsBtn");
  const confirmSkillsBtn = document.getElementById("confirmSkillsBtn");

  if (closeSkillsModalBtn) closeSkillsModalBtn.addEventListener("click", closeSkillsModal);
  if (cancelSkillsBtn) cancelSkillsBtn.addEventListener("click", closeSkillsModal);
  if (confirmSkillsBtn) {
    confirmSkillsBtn.addEventListener("click", () => {
      if (selectedSkillProgram) {
        window.location.href = `skills-registration.html?programId=${selectedSkillProgram.id}&title=${encodeURIComponent(selectedSkillProgram.title)}`;
      }
    });
  }

  function openSkillsModal(program) {
    selectedSkillProgram = program;
    document.getElementById("skillsModalTitle").textContent = `Program Application`;
    document.getElementById("skillsModalInfoBox").innerHTML = `
      <strong>Course:</strong> ${program.title}<br>
      <strong>Category:</strong> ${program.categoryLabel}<br>
      <strong>Format:</strong> ${program.mode} (${program.duration})<br>
      <strong>Tuition Fee:</strong> ${program.fee}
    `;
    skillsModal.classList.add("active");
    skillsModal.setAttribute("aria-hidden", "false");
  }

  function closeSkillsModal() {
    selectedSkillProgram = null;
    if (skillsModal) {
      skillsModal.classList.remove("active");
      skillsModal.setAttribute("aria-hidden", "true");
    }
  }
  // --- Computer Skills Sample Data ---
  const computerSkillsCourses = [
    {
      id: "CS-BEG1",
      level: "beginner",
      levelLabel: "Beginner",
      title: "Introduction to Computers & Typing Fundamentals",
      duration: "4 Weeks",
      schedule: "Mon & Wed (09:00 - 11:00)",
      fee: "K650",
      tools: "Windows OS, Keyboard Typing, Desktop Basics",
      description: "Designed for complete novices. Learn touch typing, desktop mouse navigation, file system basics, and operating system controls."
    },
    {
      id: "CS-INT1",
      level: "intermediate",
      levelLabel: "Intermediate",
      title: "Microsoft Office Suite & Document Management",
      duration: "6 Weeks",
      schedule: "Tue & Thu (14:00 - 16:00)",
      fee: "K1,200",
      tools: "MS Word, MS Excel, MS PowerPoint",
      description: "Build business office skills. Create professional reports, calculate data using spreadsheet formulas, and construct presentation slides."
    },
    {
      id: "CS-ADV1",
      level: "advanced",
      levelLabel: "Advanced Office",
      title: "Cloud Workflows, Google Workspace & Web Productivity",
      duration: "4 Weeks",
      schedule: "Saturdays (09:00 - 13:00)",
      fee: "K1,000",
      tools: "Google Docs, Sheets, Drive, Gmail, Zoom",
      description: "Master remote collaboration. Learn digital document sharing, cloud file backup, email management, and online virtual meetings."
    },
    {
      id: "CS-INT2",
      level: "intermediate",
      levelLabel: "Intermediate",
      title: "Internet Security & Digital Communication",
      duration: "3 Weeks",
      schedule: "Fridays (14:00 - 17:00)",
      fee: "K750",
      tools: "Web Browsers, Password Managers, Email",
      description: "Learn safe internet browsing, identifying online scams/phishing, securing personal accounts, and professional email writing."
    }
  ];

  let selectedCompCourse = null;

  // --- Computer Skills UI Controls ---
  const compSkillsGrid = document.getElementById("compSkillsGrid");
  const compTrackBtns = document.querySelectorAll(".track-btn[data-level]");

  if (compSkillsGrid) {
    renderCompCourses(computerSkillsCourses);

    compTrackBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        compTrackBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const level = btn.getAttribute("data-level");

        if (level === "all") {
          renderCompCourses(computerSkillsCourses);
        } else {
          const filtered = computerSkillsCourses.filter(c => c.level === level);
          renderCompCourses(filtered);
        }
      });
    });
  }

  function renderCompCourses(courses) {
    compSkillsGrid.innerHTML = "";
    if (courses.length === 0) {
      compSkillsGrid.innerHTML = `<div class="no-data"><h3>No courses available for this level</h3><p>Try selecting a different filter.</p></div>`;
      return;
    }

    courses.forEach(course => {
      const card = document.createElement("article");
      card.className = "comp-card";
      card.innerHTML = `
        <div>
          <span class="comp-badge">${course.levelLabel} Track</span>
          <h3 class="comp-title">${course.title}</h3>
          <div class="comp-meta">
            <span><strong>Duration:</strong> ${course.duration}</span>
            <span><strong>Tuition:</strong> ${course.fee}</span>
          </div>
          <p class="comp-description">${course.description}</p>
          <div class="comp-tools"><strong>Software Covered:</strong> ${course.tools}</div>
        </div>
        <button class="btn-primary btn-block enroll-comp-btn">Register for Track</button>
      `;

      card.querySelector(".enroll-comp-btn").addEventListener("click", () => openCompModal(course));
      compSkillsGrid.appendChild(card);
    });
  }

  // --- Computer Skill Modal Operations ---
  const compSkillModal = document.getElementById("compSkillModal");
  const closeCompModalBtn = document.getElementById("closeCompModalBtn");
  const cancelCompBtn = document.getElementById("cancelCompBtn");
  const confirmCompBtn = document.getElementById("confirmCompBtn");

  if (closeCompModalBtn) closeCompModalBtn.addEventListener("click", closeCompModal);
  if (cancelCompBtn) cancelCompBtn.addEventListener("click", closeCompModal);
  if (confirmCompBtn) {
    confirmCompBtn.addEventListener("click", () => {
      if (selectedCompCourse) {
        window.location.href = `skills-registration.html?programId=${selectedCompCourse.id}&title=${encodeURIComponent(selectedCompCourse.title)}`;
      }
    });
  }

  function openCompModal(course) {
    selectedCompCourse = course;
    document.getElementById("compModalTitle").textContent = `Course Registration`;
    document.getElementById("compModalInfoBox").innerHTML = `
      <strong>Track:</strong> ${course.title}<br>
      <strong>Level:</strong> ${course.levelLabel}<br>
      <strong>Schedule:</strong> ${course.schedule} (${course.duration})<br>
      <strong>Tuition Fee:</strong> ${course.fee}
    `;
    compSkillModal.classList.add("active");
    compSkillModal.setAttribute("aria-hidden", "false");
  }

  function closeCompModal() {
    selectedCompCourse = null;
    if (compSkillModal) {
      compSkillModal.classList.remove("active");
      compSkillModal.setAttribute("aria-hidden", "true");
    }
  }
  // --- Graphic Design Skills Sample Data ---
  const designSkillsCourses = [
    {
      id: "DS-BRN1",
      level: "branding",
      levelLabel: "Branding & Logo",
      title: "Logo Design, Vector Graphics & Brand Identity",
      duration: "6 Weeks",
      schedule: "Tue & Thu (10:00 - 12:00)",
      fee: "K1,500",
      software: "Adobe Illustrator, Vector Tools, Canva Pro",
      description: "Learn vector logo creation, typography pairing, signature font stylizing, visual color palettes, and full corporate style guides."
    },
    {
      id: "DS-EDT1",
      level: "editing",
      levelLabel: "Image Editing",
      title: "Digital Photo Editing & Background Removal",
      duration: "4 Weeks",
      schedule: "Mon & Wed (14:00 - 16:00)",
      fee: "K1,100",
      software: "Adobe Photoshop, Photopea, Image Isolators",
      description: "Master photo retouching, isolating transparent PNG backgrounds, subject lighting adjustments, and visual graphics compositing."
    },
    {
      id: "DS-LAY1",
      level: "layout",
      levelLabel: "Publication & Print",
      title: "Promotional Flyer & Event Poster Design",
      duration: "4 Weeks",
      schedule: "Saturdays (09:00 - 12:00)",
      fee: "K1,000",
      software: "Photoshop, Canva, InDesign Basics",
      description: "Create eye-catching marketing flyers, concert posters, business cards, banner layouts, and print-ready export setups."
    },
    {
      id: "DS-BRN2",
      level: "branding",
      levelLabel: "Branding & Logo",
      title: "Commercial Social Media Content & Packaging Design",
      duration: "5 Weeks",
      schedule: "Fridays (13:00 - 16:00)",
      fee: "K1,300",
      software: "Figma, Illustrator, Photoshop",
      description: "Design social media templates, ad graphics, food packaging labels (boxes, stickers), and digital promotional assets for local businesses."
    }
  ];

  let selectedDesignCourse = null;

  // --- Design Skills UI Controls ---
  const designSkillsGrid = document.getElementById("designSkillsGrid");
  const designTrackBtns = document.querySelectorAll(".track-btn[data-design-level]");

  if (designSkillsGrid) {
    renderDesignCourses(designSkillsCourses);

    designTrackBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        designTrackBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const level = btn.getAttribute("data-design-level");

        if (level === "all") {
          renderDesignCourses(designSkillsCourses);
        } else {
          const filtered = designSkillsCourses.filter(c => c.level === level);
          renderDesignCourses(filtered);
        }
      });
    });
  }

  function renderDesignCourses(courses) {
    designSkillsGrid.innerHTML = "";
    if (courses.length === 0) {
      designSkillsGrid.innerHTML = `<div class="no-data"><h3>No modules available for this track</h3><p>Try selecting a different filter option.</p></div>`;
      return;
    }

    courses.forEach(course => {
      const card = document.createElement("article");
      card.className = "design-card";
      card.innerHTML = `
        <div>
          <span class="design-badge">${course.levelLabel} Track</span>
          <h3 class="design-title">${course.title}</h3>
          <div class="design-meta">
            <span><strong>Duration:</strong> ${course.duration}</span>
            <span><strong>Tuition:</strong> ${course.fee}</span>
          </div>
          <p class="design-description">${course.description}</p>
          <div class="design-software"><strong>Software Covered:</strong> ${course.software}</div>
        </div>
        <button class="btn-primary btn-block enroll-design-btn">Register for Track</button>
      `;

      card.querySelector(".enroll-design-btn").addEventListener("click", () => openDesignModal(course));
      designSkillsGrid.appendChild(card);
    });
  }

  // --- Design Skill Modal Operations ---
  const designSkillModal = document.getElementById("designSkillModal");
  const closeDesignModalBtn = document.getElementById("closeDesignModalBtn");
  const cancelDesignBtn = document.getElementById("cancelDesignBtn");
  const confirmDesignBtn = document.getElementById("confirmDesignBtn");

  if (closeDesignModalBtn) closeDesignModalBtn.addEventListener("click", closeDesignModal);
  if (cancelDesignBtn) cancelDesignBtn.addEventListener("click", closeDesignModal);
  if (confirmDesignBtn) {
    confirmDesignBtn.addEventListener("click", () => {
      if (selectedDesignCourse) {
        window.location.href = `skills-registration.html?programId=${selectedDesignCourse.id}&title=${encodeURIComponent(selectedDesignCourse.title)}`;
      }
    });
  }

  function openDesignModal(course) {
    selectedDesignCourse = course;
    document.getElementById("designModalTitle").textContent = `Course Registration`;
    document.getElementById("designModalInfoBox").innerHTML = `
      <strong>Track:</strong> ${course.title}<br>
      <strong>Category:</strong> ${course.levelLabel}<br>
      <strong>Schedule:</strong> ${course.schedule} (${course.duration})<br>
      <strong>Tuition Fee:</strong> ${course.fee}
    `;
    designSkillModal.classList.add("active");
    designSkillModal.setAttribute("aria-hidden", "false");
  }

  function closeDesignModal() {
    selectedDesignCourse = null;
    if (designSkillModal) {
      designSkillModal.classList.remove("active");
      designSkillModal.setAttribute("aria-hidden", "true");
    }
  }
  // --- Training Programs Sample Data ---
  const trainingPrograms = [
    {
      id: "TR-FND1",
      category: "foundational",
      categoryLabel: "Foundational ZSL",
      title: "Certificate in Zambian Sign Language (Level 1)",
      duration: "8 Weeks",
      schedule: "Mon & Wed (17:00 - 19:00)",
      fee: "K1,200",
      prerequisite: "None (Open to all beginners)",
      description: "Master foundational ZSL vocabulary, fingerspelling, spatial sentence construction, and basic conversational fluency for daily interactions."
    },
    {
      id: "TR-PRO1",
      category: "professional",
      categoryLabel: "Professional Interpreting",
      title: "Professional Sign Language Interpreter Diploma",
      duration: "16 Weeks",
      schedule: "Tue & Thu (17:00 - 19:30)",
      fee: "K3,500",
      prerequisite: "ZSL Level 1 Certification or Equivalent Fluency",
      description: "Comprehensive interpreter preparation covering simultaneous/consecutive techniques, memory lag control, professional ethics, and live practicum sessions."
    },
    {
      id: "TR-SPC1",
      category: "specialized",
      categoryLabel: "Specialized Legal & Medical",
      title: "Legal & Courtroom Interpreting Specialization",
      duration: "6 Weeks",
      schedule: "Saturdays (08:30 - 12:30)",
      fee: "K2,200",
      prerequisite: "Completed Professional Interpreter Diploma",
      description: "Advanced training in judicial protocol, legal terminology, courtroom positioning, sworn statements, and maintaining strict neutrality."
    },
    {
      id: "TR-SPC2",
      category: "specialized",
      categoryLabel: "Specialized Legal & Medical",
      title: "Medical & Healthcare Interpreting Certificate",
      duration: "6 Weeks",
      schedule: "Fridays (14:00 - 17:30)",
      fee: "K2,000",
      prerequisite: "Completed Professional Interpreter Diploma",
      description: "Focused practice for clinical settings, healthcare consent forms, patient communication ethics, and medical diagnostic vocabulary."
    }
  ];

  let selectedTrainingProgram = null;

  // --- Training UI Controls ---
  const trainingGrid = document.getElementById("trainingGrid");
  const trainCategoryBtns = document.querySelectorAll(".track-btn[data-train-category]");

  if (trainingGrid) {
    renderTrainingPrograms(trainingPrograms);

    trainCategoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        trainCategoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-train-category");

        if (category === "all") {
          renderTrainingPrograms(trainingPrograms);
        } else {
          const filtered = trainingPrograms.filter(p => p.category === category);
          renderTrainingPrograms(filtered);
        }
      });
    });
  }

  function renderTrainingPrograms(programs) {
    trainingGrid.innerHTML = "";
    if (programs.length === 0) {
      trainingGrid.innerHTML = `<div class="no-data"><h3>No training tracks available for this category</h3><p>Try selecting a different filter option.</p></div>`;
      return;
    }

    programs.forEach(program => {
      const card = document.createElement("article");
      card.className = "training-card";
      card.innerHTML = `
        <div>
          <span class="training-badge">${program.categoryLabel}</span>
          <h3 class="training-title">${program.title}</h3>
          <div class="training-meta">
            <span><strong>Duration:</strong> ${program.duration}</span>
            <span><strong>Tuition:</strong> ${program.fee}</span>
          </div>
          <p class="training-description">${program.description}</p>
          <div class="training-prereq"><strong>Prerequisite:</strong> ${program.prerequisite}</div>
        </div>
        <button class="btn-primary btn-block enroll-train-btn">Apply for Program</button>
      `;

      card.querySelector(".enroll-train-btn").addEventListener("click", () => openTrainingModal(program));
      trainingGrid.appendChild(card);
    });
  }

  // --- Training Modal Operations ---
  const trainingModal = document.getElementById("trainingModal");
  const closeTrainingModalBtn = document.getElementById("closeTrainingModalBtn");
  const cancelTrainingBtn = document.getElementById("cancelTrainingBtn");
  const confirmTrainingBtn = document.getElementById("confirmTrainingBtn");

  if (closeTrainingModalBtn) closeTrainingModalBtn.addEventListener("click", closeTrainingModal);
  if (cancelTrainingBtn) cancelTrainingBtn.addEventListener("click", closeTrainingModal);
  if (confirmTrainingBtn) {
    confirmTrainingBtn.addEventListener("click", () => {
      if (selectedTrainingProgram) {
        window.location.href = `interpreter-training.html?programId=${selectedTrainingProgram.id}&title=${encodeURIComponent(selectedTrainingProgram.title)}`;
      }
    });
  }

  function openTrainingModal(program) {
    selectedTrainingProgram = program;
    document.getElementById("trainingModalTitle").textContent = `Program Registration`;
    document.getElementById("trainingModalInfoBox").innerHTML = `
      <strong>Track:</strong> ${program.title}<br>
      <strong>Category:</strong> ${program.categoryLabel}<br>
      <strong>Schedule:</strong> ${program.schedule} (${program.duration})<br>
      <strong>Tuition Fee:</strong> ${program.fee}
    `;
    trainingModal.classList.add("active");
    trainingModal.setAttribute("aria-hidden", "false");
  }

  function closeTrainingModal() {
    selectedTrainingProgram = null;
    if (trainingModal) {
      trainingModal.classList.remove("active");
      trainingModal.setAttribute("aria-hidden", "true");
    }
  }
  // --- Decision Wizard Logic for Get Started Page ---
  const guidedWizard = document.getElementById("guidedWizard");

  if (guidedWizard) {
    const wizardStep1 = document.getElementById("wizardStep1");
    const wizardStep2 = document.getElementById("wizardStep2");
    const wizardStep3 = document.getElementById("wizardStep3");
    const wizardStep2Title = document.getElementById("wizardStep2Title");
    const wizardStep2Options = document.getElementById("wizardStep2Options");
    const wizardResultBox = document.getElementById("wizardResultBox");
    const resetWizardBtn = document.getElementById("resetWizardBtn");

    let wizardSelection = { objective: null, subType: null };

    // Step 1 Click Handler
    wizardStep1.querySelectorAll(".btn-wizard-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        wizardSelection.objective = target;
        renderWizardStep2(target);
      });
    });

    function renderWizardStep2(objective) {
      wizardStep1.classList.remove("active");
      wizardStep2.classList.add("active");
      wizardStep2Options.innerHTML = "";

      if (objective === "learn") {
        wizardStep2Title.textContent = "What would you like to learn?";
        wizardStep2Options.innerHTML = `
          <button class="btn-wizard-opt" data-sub="zsl">Zambian Sign Language (ZSL) & Communication</button>
          <button class="btn-wizard-opt" data-sub="computer">Computer & Office Productivity Skills</button>
          <button class="btn-wizard-opt" data-sub="design">Graphic Design & Photo Editing</button>
        `;
      } else if (objective === "service") {
        wizardStep2Title.textContent = "What service do you require?";
        wizardStep2Options.innerHTML = `
          <button class="btn-wizard-opt" data-sub="book-interp">Hire an On-site or Online ZSL Interpreter</button>
          <button class="btn-wizard-opt" data-sub="member">Apply for Organizational or Individual Membership</button>
        `;
      } else if (objective === "career") {
        wizardStep2Title.textContent = "What is your current experience level?";
        wizardStep2Options.innerHTML = `
          <button class="btn-wizard-opt" data-sub="beginner-train">Beginner looking for certification</button>
          <button class="btn-wizard-opt" data-sub="advanced-train">Experienced signer wanting legal/medical interpreter training</button>
        `;
      }

      wizardStep2Options.querySelectorAll(".btn-wizard-opt").forEach(btn => {
        btn.addEventListener("click", () => {
          wizardSelection.subType = btn.getAttribute("data-sub");
          showWizardResult(wizardSelection);
        });
      });
    }

    function showWizardResult(selection) {
      wizardStep2.classList.remove("active");
      wizardStep3.classList.add("active");

      let title = "";
      let desc = "";
      let link = "";
      let linkText = "";

      switch (selection.subType) {
        case "zsl":
          title = "Language School - ZSL Program";
          desc = "Our ZSL classes provide structured instruction for all level learners.";
          link = "class-registration.html";
          linkText = "Go to Class Registration";
          break;
        case "computer":
          title = "Computer Skills Program";
          desc = "Master desktop applications, document formatting, and spreadsheets.";
          link = "computer-skills.html";
          linkText = "Explore Computer Skills";
          break;
        case "design":
          title = "Graphic Design & Creative Skills";
          desc = "Learn logo creation, visual layout, and commercial poster design.";
          link = "designing-skills.html";
          linkText = "Explore Design Skills";
          break;
        case "book-interp":
          title = "Interpreter Service Booking";
          desc = "Schedule certified sign language interpreters for your events or meetings.";
          link = "booking.html";
          linkText = "Book an Interpreter";
          break;
        case "member":
          title = "SL-CLASSES Membership Portal";
          desc = "Join our community network for discounted courses and community support.";
          link = "membership.html";
          linkText = "View Membership Plans";
          break;
        case "beginner-train":
        case "advanced-train":
          title = "Interpreter Training Academy";
          desc = "Earn accredited certifications and qualify for commercial dispatch.";
          link = "interpreter-training.html";
          linkText = "Apply for Interpreter Training";
          break;
        default:
          title = "SL-CLASSES Programs";
          desc = "Explore our wide range of accessible programs.";
          link = "index.html";
          linkText = "Return to Home";
      }

      wizardResultBox.innerHTML = `
        <h4>Recommended: ${title}</h4>
        <p>${desc}</p>
        <a href="${link}" class="btn-primary">${linkText} &rarr;</a>
      `;
    }

    if (resetWizardBtn) {
      resetWizardBtn.addEventListener("click", () => {
        wizardSelection = { objective: null, subType: null };
        wizardStep3.classList.remove("active");
        wizardStep2.classList.remove("active");
        wizardStep1.classList.add("active");
      });
    }
  }
  // --- URL Query Parameter Parsing (Pre-populate Course Selection) ---
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedProgramId = urlParams.get("programId");
  const courseSelectEl = document.getElementById("courseSelect");

  if (courseSelectEl && preselectedProgramId) {
    // Attempt to match query param with dropdown option values
    for (let i = 0; i < courseSelectEl.options.length; i++) {
      if (courseSelectEl.options[i].value === preselectedProgramId) {
        courseSelectEl.selectedIndex = i;
        break;
      }
    }
  }

  // --- Class Registration Form Handling ---
  const classRegistrationForm = document.getElementById("classRegistrationForm");
  const classRegAlert = document.getElementById("classRegAlert");

  if (classRegistrationForm) {
    classRegistrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Reset past errors
      clearClassRegErrors();
      
      // Collect input values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const location = document.getElementById("location").value.trim();
      const course = courseSelectEl ? courseSelectEl.value : "";
      const schedule = document.getElementById("preferredSchedule").value;
      const termsCheck = document.getElementById("termsCheck").checked;

      let isValid = true;

      // Validate Full Name
      if (!fullName) {
        showFieldError("fullName", "Please enter your full name.");
        isValid = false;
      }

      // Validate Email
      if (!email) {
        showFieldError("email", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showFieldError("email", "Please enter a valid email address.");
        isValid = false;
      }

      // Validate Phone
      if (!phone) {
        showFieldError("phone", "Please enter your contact phone number.");
        isValid = false;
      }

      // Validate Location
      if (!location) {
        showFieldError("location", "Please enter your city or town.");
        isValid = false;
      }

      // Validate Course
      if (!course) {
        showFieldError("courseSelect", "Please select a course track.");
        isValid = false;
      }

      // Validate Schedule
      if (!schedule) {
        showFieldError("preferredSchedule", "Please select your preferred schedule.");
        isValid = false;
      }

      // Validate Terms Checkbox
      if (!termsCheck) {
        showFieldError("termsCheck", "You must agree to the terms to proceed.");
        isValid = false;
      }

      if (isValid) {
        // Show success alert
        classRegAlert.className = "alert-box success";
        classRegAlert.style.display = "block";
        classRegAlert.innerHTML = `
          <strong>Application Received!</strong> Thank you, <strong>${escapeHtml(fullName)}</strong>. Your registration application for <strong>${escapeHtml(course)}</strong> has been successfully submitted. We will contact you at <strong>${escapeHtml(email)}</strong> shortly with onboarding details.
        `;

        // Scroll smoothly to alert box
        classRegAlert.scrollIntoView({ behavior: "smooth", block: "center" });

        // Reset form
        classRegistrationForm.reset();
      } else {
        // Show error alert
        classRegAlert.className = "alert-box error";
        classRegAlert.style.display = "block";
        classRegAlert.innerHTML = `<strong>Submission Error:</strong> Please fix the highlighted fields above before submitting.`;
        
        classRegAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (field) field.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  }

  function clearClassRegErrors() {
    if (classRegAlert) classRegAlert.style.display = "none";
    const invalidInputs = classRegistrationForm.querySelectorAll(".is-invalid");
    invalidInputs.forEach(input => input.classList.remove("is-invalid"));
    const errorMessages = classRegistrationForm.querySelectorAll(".error-msg");
    errorMessages.forEach(msg => (msg.textContent = ""));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[m];
    });
  }
  // --- Skills Registration Form Handling & URL Prefill ---
  const skillsRegistrationForm = document.getElementById("skillsRegistrationForm");
  const skillsRegAlert = document.getElementById("skillsRegAlert");
  const skillTrackSelect = document.getElementById("skillTrack");

  // Pre-fill module from URL query parameter (e.g. skills-registration.html?track=GRAPH-101)
  if (skillTrackSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const trackParam = urlParams.get("track") || urlParams.get("module") || urlParams.get("course");
    
    if (trackParam) {
      for (let i = 0; i < skillTrackSelect.options.length; i++) {
        if (skillTrackSelect.options[i].value.toLowerCase() === trackParam.toLowerCase()) {
          skillTrackSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  if (skillsRegistrationForm) {
    skillsRegistrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset previous error messages and styling
      clearSkillsErrors();

      // Read form field values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const location = document.getElementById("location").value.trim();
      const skillTrack = skillTrackSelect ? skillTrackSelect.value : "";
      const experienceLevel = document.getElementById("experienceLevel").value;
      const hasLaptop = document.getElementById("hasLaptop").value;
      const preferredCohort = document.getElementById("preferredCohort").value;
      const termsChecked = document.getElementById("skillsTermsCheck").checked;

      let isValid = true;

      // Validation Checks
      if (!fullName) {
        showFieldError("fullName", "Please enter your full name.");
        isValid = false;
      }

      if (!email) {
        showFieldError("email", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showFieldError("email", "Please enter a valid email address.");
        isValid = false;
      }

      if (!phone) {
        showFieldError("phone", "Please enter your phone number.");
        isValid = false;
      }

      if (!location) {
        showFieldError("location", "Please specify your city or district.");
        isValid = false;
      }

      if (!skillTrack) {
        showFieldError("skillTrack", "Please select a practical module.");
        isValid = false;
      }

      if (!experienceLevel) {
        showFieldError("experienceLevel", "Please select your current proficiency level.");
        isValid = false;
      }

      if (!hasLaptop) {
        showFieldError("hasLaptop", "Please indicate your laptop availability.");
        isValid = false;
      }

      if (!preferredCohort) {
        showFieldError("preferredCohort", "Please select a cohort schedule.");
        isValid = false;
      }

      if (!termsChecked) {
        showFieldError("skillsTermsCheck", "You must accept the Code of Conduct to enroll.");
        isValid = false;
      }

      // Handle Form Submission Outcome
      if (isValid) {
        const trackText = skillTrackSelect.options[skillTrackSelect.selectedIndex].text;
        
        skillsRegAlert.className = "alert-box success";
        skillsRegAlert.style.display = "block";
        skillsRegAlert.innerHTML = `
          <strong>Skills Registration Successful!</strong><br>
          Thank you, <strong>${escapeHtml(fullName)}</strong>. Your application for <strong>${escapeHtml(trackText)}</strong> has been registered. Our training coordinator will contact you via phone (<strong>${escapeHtml(phone)}</strong>) or email with your lab schedule and class orientation details.
        `;

        skillsRegAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        skillsRegistrationForm.reset();
      } else {
        skillsRegAlert.className = "alert-box error";
        skillsRegAlert.style.display = "block";
        skillsRegAlert.innerHTML = `<strong>Registration Error:</strong> Please review and correct the highlighted fields below before submitting.`;
        
        skillsRegAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (field) field.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  }

  function clearSkillsErrors() {
    if (skillsRegAlert) skillsRegAlert.style.display = "none";
    const invalidInputs = skillsRegistrationForm.querySelectorAll(".is-invalid");
    invalidInputs.forEach(input => input.classList.remove("is-invalid"));
    const errorMessages = skillsRegistrationForm.querySelectorAll(".error-msg");
    errorMessages.forEach(msg => (msg.textContent = ""));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[m];
    });
  }
  // --- Animated Counter for About Page Stats ---
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statNumbers.length > 0) {
    let animated = false;

    function runCounters() {
      statNumbers.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const speed = 200; // lower is faster
        const increment = target / speed;

        let count = 0;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
    }

    // Scroll trigger using IntersectionObserver
    const observerOptions = {
      threshold: 0.3
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          runCounters();
          animated = true;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }
  // --- Contact Form Handling & Validation ---
  const contactForm = document.getElementById("contactForm");
  const contactAlert = document.getElementById("contactAlert");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear existing errors
      clearContactErrors();

      // Read values
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const phone = document.getElementById("contactPhone").value.trim();
      const subject = document.getElementById("contactSubject").value;
      const message = document.getElementById("contactMessage").value.trim();

      let isValid = true;

      // Validation logic
      if (!name) {
        showContactError("contactName", "Please enter your full name.");
        isValid = false;
      }

      if (!email) {
        showContactError("contactEmail", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showContactError("contactEmail", "Please enter a valid email address.");
        isValid = false;
      }

      if (!phone) {
        showContactError("contactPhone", "Please enter your phone number.");
        isValid = false;
      }

      if (!subject) {
        showContactError("contactSubject", "Please select an inquiry category.");
        isValid = false;
      }

      if (!message) {
        showContactError("contactMessage", "Please enter your message.");
        isValid = false;
      }

      // Handle Submission Outcome
      if (isValid) {
        contactAlert.className = "alert-box success";
        contactAlert.style.display = "block";
        contactAlert.innerHTML = `
          <strong>Message Sent Successfully!</strong><br>
          Thank you, <strong>${escapeHtml(name)}</strong>. We have received your inquiry regarding <strong>${escapeHtml(subject)}</strong>. Our administration team will contact you shortly via email or phone.
        `;

        contactAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        contactForm.reset();
      } else {
        contactAlert.className = "alert-box error";
        contactAlert.style.display = "block";
        contactAlert.innerHTML = `<strong>Error:</strong> Please fill out all required fields before sending your message.`;

        contactAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  function showContactError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (field) field.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  }

  function clearContactErrors() {
    if (contactAlert) contactAlert.style.display = "none";
    const invalidInputs = contactForm.querySelectorAll(".is-invalid");
    invalidInputs.forEach((input) => input.classList.remove("is-invalid"));
    const errorMessages = contactForm.querySelectorAll(".error-msg");
    errorMessages.forEach((msg) => (msg.textContent = ""));
  }