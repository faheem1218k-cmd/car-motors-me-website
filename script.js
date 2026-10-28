
"use strict";

/* =========================================
   FAHEEM DEALER — MAIN JAVASCRIPT
   Pure JavaScript — Beginner Friendly
========================================= */

// 1. VARIABLES AND CONFIGURATION

const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
const businessEmail = "faheem1218k@gmail.com";

// DOM elements ko IDs se select karna.
const loader = document.getElementById("loader");
const header = document.getElementById("header");
const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");
const carsGrid = document.getElementById("carsGrid");
const carFilters = document.getElementById("carFilters");
const galleryModal = document.getElementById("galleryModal");
const detailsModal = document.getElementById("detailsModal");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryCounter = document.getElementById("galleryCounter");
const detailsContent = document.getElementById("detailsContent");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const heroTitle = document.getElementById("heroTitle");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const backToTop = document.getElementById("backToTop");

// Current gallery aur selected car ki information.
let currentCar = null;
let currentImageIndex = 0;
let currentFilter = "All";
let currentSlide = 0;
let slideTimer = null;

// =========================================
// 2. CAR DATA: ARRAYS AND OBJECTS
// =========================================

const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Toyota Corolla Altis",
    year: 2024,
    condition: "Used",
    price: 3000000,
    description: "A practical sedan with a comfortable cabin, elegant styling and everyday usability.",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 2,
    brand: "Toyota",
    model: "Toyota Corolla Grande",
    year: 2023,
    condition: "Used",
    price: 4200000,
    description: "A refined Corolla variant designed for comfortable daily driving and long journeys.",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Toyota Corolla GLi",
    year: 2022,
    condition: "Used",
    price: 2800000,
    description: "A practical sedan concept with a clean exterior and everyday driving comfort.",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Toyota Corolla XLi",
    year: 2021,
    condition: "Used",
    price: 2400000,
    description: "A straightforward compact sedan option for buyers looking for daily transportation.",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 5,
    brand: "Tesla",
    model: "Tesla Model S",
    year: 2024,
    condition: "Used",
    price: 25000000,
    description: "An electric luxury sedan concept with a minimalist interior and modern design.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 6,
    brand: "Tesla",
    model: "Tesla Model 3",
    year: 2023,
    condition: "Used",
    price: 18000000,
    description: "A streamlined electric sedan concept for modern urban driving and everyday travel.",
    images: [
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 7,
    brand: "Tesla",
    model: "Tesla Model X",
    year: 2024,
    condition: "Used",
    price: 30000000,
    description: "An electric SUV concept combining spacious proportions with distinctive styling.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 8,
    brand: "Tesla",
    model: "Tesla Model Y",
    year: 2023,
    condition: "Used",
    price: 20000000,
    description: "An electric crossover concept with versatile space and contemporary styling.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 9,
    brand: "Ferrari",
    model: "Ferrari 488",
    year: 2022,
    condition: "Used",
    price: 85000000,
    description: "A performance-focused sports car concept with dramatic proportions and exotic styling.",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 10,
    brand: "Ferrari",
    model: "Ferrari F8 Tributo",
    year: 2023,
    condition: "Used",
    price: 110000000,
    description: "An exotic sports car concept inspired by Italian performance and sculpted bodywork.",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 11,
    brand: "Ferrari",
    model: "Ferrari Roma",
    year: 2024,
    condition: "Used",
    price: 95000000,
    description: "An elegant grand touring sports car concept with sophisticated Italian design.",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1100&q=85"
    ]
  },
  {
    id: 12,
    brand: "Ferrari",
    model: "Ferrari SF90 Stradale",
    year: 2024,
    condition: "Used",
    price: 180000000,
    description: "An advanced hybrid supercar concept with striking styling and extraordinary performance ambitions.",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1100&q=85"
    ]
  }
];

// =========================================
// 3. HELPER FUNCTIONS
// =========================================

function formatPrice(price) {
  return "PKR " + price.toLocaleString("en-PK");
}

function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(/[&<>"']/g, function (character) {
    return characters[character];
  });
}

function getCarById(carId) {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].id === Number(carId)) {
      return cars[i];
    }
  }

  return null;
}

// =========================================
// 4. GENERATOR FUNCTION
// =========================================

function* carGenerator(carList) {
  for (let i = 0; i < carList.length; i++) {
    yield carList[i];
  }
}

// =========================================
// 5. IMAGE FALLBACK
// =========================================

const fallbackImage =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550">' +
    '<rect width="100%" height="100%" fill="#171717"/>' +
    '<text x="50%" y="47%" text-anchor="middle" fill="#d5b16a" font-size="38" font-family="Georgia">FAHEEM DEALER</text>' +
    '<text x="50%" y="57%" text-anchor="middle" fill="#aaaaaa" font-size="17" font-family="Arial">PREMIUM AUTOMOBILES</text>' +
    '</svg>'
  );

document.addEventListener("error", function (event) {
  if (event.target.tagName === "IMG") {
    const image = event.target;

    if (image.dataset.fallbackApplied !== "true") {
      image.dataset.fallbackApplied = "true";
      image.src = fallbackImage;
    }
  }
}, true);

// =========================================
// 6. LOADING SCREEN
// =========================================

setTimeout(function () {
  loader.classList.add("hidden");
  document.body.classList.remove("loading");

  setTimeout(function () {
    animateHeroTitle();
  }, 1000);
}, 3000);

// =========================================
// 7. HERO TITLE ANIMATION
// FIX: FAHEEM UPAR, DEALER NEECHE
// Letter animation preserved.
// =========================================

function animateHeroTitle() {
  const titleWords = ["FAHEEM", "DEALER"];
  let html = "";
  let letterIndex = 0;

  for (let wordIndex = 0; wordIndex < titleWords.length; wordIndex++) {
    html += '<span class="hero-word">';

    const word = titleWords[wordIndex];

    for (let i = 0; i < word.length; i++) {
      html +=
        '<span class="letter" style="animation-delay:' +
        (letterIndex * 0.12) +
        's">' +
        word[i] +
        '</span>';

      letterIndex++;
    }

    html += "</span>";
  }

  heroTitle.innerHTML = html;
}

// =========================================
// 8. MOBILE HAMBURGER MENU
// =========================================

function closeMenu() {
  navbar.classList.remove("open");
  burger.classList.remove("active");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open navigation");
}

burger.addEventListener("click", function () {
  navbar.classList.toggle("open");
  burger.classList.toggle("active");

  const isOpen = navbar.classList.contains("open");

  burger.setAttribute("aria-expanded", String(isOpen));
  burger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

for (let i = 0; i < navbar.children.length; i++) {
  navbar.children[i].addEventListener("click", function () {
    closeMenu();
  });
}

// Desktop par resize karne par mobile menu reset karna.
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

// =========================================
// 9. NAVIGATION ACTIVE LINK
// =========================================

const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink(sectionId) {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");

    if (navLinks[i].getAttribute("href") === "#" + sectionId) {
      navLinks[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  const sections = document.querySelectorAll("main section[id]");
  let activeSection = "home";

  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 160) {
      activeSection = sections[i].id;
    }
  }

  setActiveLink(activeSection);
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// =========================================
// 10. HERO BACKGROUND SLIDESHOW
// =========================================

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

function showSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = heroSlides.length - 1;
  } else if (slideIndex >= heroSlides.length) {
    slideIndex = 0;
  }

  currentSlide = slideIndex;

  for (let i = 0; i < heroSlides.length; i++) {
    heroSlides[i].classList.remove("active");
    heroDots[i].classList.remove("active");
  }

  heroSlides[currentSlide].classList.add("active");
  heroDots[currentSlide].classList.add("active");

  const slideNumber = document.querySelector(".hero-bottom > span");

  if (slideNumber) {
    slideNumber.textContent =
      "0" + (currentSlide + 1) + " — 0" + heroSlides.length;
  }
}

function startSlideshow() {
  if (slideTimer !== null) {
    clearInterval(slideTimer);
  }

  slideTimer = setInterval(function () {
    showSlide(currentSlide + 1);
  }, 6000);
}

for (let i = 0; i < heroDots.length; i++) {
  heroDots[i].addEventListener("click", function () {
    showSlide(Number(this.dataset.slide));
    startSlideshow();
  });
}

startSlideshow();

// =========================================
// 11. WHATSAPP ORDER SYSTEM
// =========================================

function openWhatsApp(car) {
  if (
    whatsappNumber === "YOUR_WHATSAPP_NUMBER" ||
    whatsappNumber.trim() === ""
  ) {
    alert(
      "WhatsApp number abhi set nahi hai. script.js mein " +
      'YOUR_WHATSAPP_NUMBER ko apne international number se replace karein.'
    );
    return;
  }

  const cleanNumber = whatsappNumber.replace(/\D/g, "");

  if (cleanNumber.length < 8) {
    alert("Please script.js mein valid international WhatsApp number enter karein.");
    return;
  }

  const message =
    "Hello FAHEEM DEALER! I am interested in buying " +
    car.model +
    ". The listed price is " +
    formatPrice(car.price) +
    ". Please share more details about this car.";

  const whatsappURL =
    "https://wa.me/" +
    cleanNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

// =========================================
// 12. CAR CARD HTML
// =========================================

function createCarCard(car) {
  return `
    <article class="car-card reveal" data-car-id="${car.id}">
      <div class="car-image-wrap" data-action="gallery" data-id="${car.id}">
        <img
          src="${car.images[0]}"
          alt="${escapeHTML(car.model)}"
          loading="lazy"
          data-car-image="${car.id}"
        >

        <span class="car-badge">${escapeHTML(car.brand)}</span>
        <span class="car-image-action">VIEW GALLERY ↗</span>
      </div>

      <div class="car-info">
        <span class="car-brand">${escapeHTML(car.brand)} COLLECTION</span>
        <h3>${escapeHTML(car.model)}</h3>

        <div class="car-meta">
          <span>${car.year}</span>
          <span>${escapeHTML(car.condition)}</span>
          <span>Demo listing</span>
        </div>

        <p class="car-price-label">LISTED DEMO PRICE</p>
        <p class="car-price">${formatPrice(car.price)}</p>

        <div class="car-actions">
          <button class="btn btn-details" data-action="details" data-id="${car.id}">
            VIEW DETAILS
          </button>

          <button class="btn btn-whatsapp" data-action="whatsapp" data-id="${car.id}">
            WHATSAPP ORDER
          </button>
        </div>
      </div>
    </article>
  `;
}

// =========================================
// 13. RENDER CAR CARDS USING GENERATOR
// =========================================

function renderCars(filter = "All") {
  currentFilter = filter;
  carsGrid.innerHTML = "";

  const carItems = carGenerator(cars);

  for (const car of carItems) {
    if (filter === "All") {
      carsGrid.insertAdjacentHTML("beforeend", createCarCard(car));
    } else if (car.brand === filter) {
      carsGrid.insertAdjacentHTML("beforeend", createCarCard(car));
    } else {
      continue;
    }
  }

  observeRevealElements();
}

renderCars();

// =========================================
// 14. CAR FILTER BUTTONS
// =========================================

carFilters.addEventListener("click", function (event) {
  const button = event.target.closest(".filter-btn");

  if (!button) {
    return;
  }

  const filter = button.dataset.filter;
  const filterButtons = carFilters.querySelectorAll(".filter-btn");

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("active");
  }

  button.classList.add("active");
  renderCars(filter);
});

// =========================================
// 15. CAR CARD BUTTON EVENTS
// =========================================

carsGrid.addEventListener("click", function (event) {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  const action = actionElement.dataset.action;
  const car = getCarById(actionElement.dataset.id);

  if (!car) {
    return;
  }

  if (action === "gallery") {
    openGallery(car);
  } else if (action === "details") {
    openDetails(car);
  } else if (action === "whatsapp") {
    openWhatsApp(car);
  }
});

// =========================================
// 16. GALLERY MODAL
// =========================================

function openGallery(car) {
  currentCar = car;
  currentImageIndex = 0;

  galleryTitle.textContent = car.model;
  updateGalleryImage();

  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeButton = galleryModal.querySelector(".modal-close");
  closeButton.focus();
}

function updateGalleryImage() {
  if (!currentCar) {
    return;
  }

  galleryImage.classList.add("changing");

  setTimeout(function () {
    galleryImage.src = currentCar.images[currentImageIndex];
    galleryImage.alt =
      currentCar.model + " image " + (currentImageIndex + 1);

    galleryCounter.textContent =
      (currentImageIndex + 1) + " / " + currentCar.images.length;

    galleryImage.classList.remove("changing");
  }, 120);
}

function changeGalleryImage(direction) {
  if (!currentCar) {
    return;
  }

  currentImageIndex += direction;

  if (currentImageIndex >= currentCar.images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = currentCar.images.length - 1;
  }

  updateGalleryImage();
}

galleryNext.addEventListener("click", function () {
  changeGalleryImage(1);
});

galleryPrev.addEventListener("click", function () {
  changeGalleryImage(-1);
});

function closeGallery() {
  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");

  if (!detailsModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

// =========================================
// 17. CAR DETAILS MODAL
// =========================================

function openDetails(car) {
  currentCar = car;

  detailsContent.innerHTML = `
    <div class="details-layout">
      <div>
        <img
          src="${car.images[0]}"
          alt="${escapeHTML(car.model)}"
          class="details-image"
          id="detailsImage"
        >
        <p class="details-gallery-hint">CLICK IMAGE TO VIEW GALLERY ↗</p>
      </div>

      <div class="details-copy">
        <p class="eyebrow">${escapeHTML(car.brand)} COLLECTION</p>
        <h2>${escapeHTML(car.model)}</h2>
        <div class="details-price">${formatPrice(car.price)}</div>

        <div class="details-specs">
          <span>Year: ${car.year}</span>
          <span>Condition: ${escapeHTML(car.condition)}</span>
          <span>Location: Karachi</span>
        </div>

        <p>${escapeHTML(car.description)}</p>

        <p class="demo-note">
          Demo listing only. Verify availability, condition and final price with the seller.
        </p>

        <button class="btn btn-gold" id="detailsWhatsApp">
          WHATSAPP ORDER ↗
        </button>
      </div>
    </div>
  `;

  detailsModal.classList.add("open");
  detailsModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const detailsImage = document.getElementById("detailsImage");

  detailsImage.addEventListener("click", function () {
    closeDetails();
    openGallery(car);
  });

  document.getElementById("detailsWhatsApp").addEventListener("click", function () {
    openWhatsApp(car);
  });

  detailsModal.querySelector(".modal-close").focus();
}

function closeDetails() {
  detailsModal.classList.remove("open");
  detailsModal.setAttribute("aria-hidden", "true");

  if (!galleryModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

// =========================================
// 18. MODAL CLOSE BUTTONS AND BACKDROPS
// =========================================

document.addEventListener("click", function (event) {
  const closeElement = event.target.closest("[data-close]");

  if (!closeElement) {
    return;
  }

  const modalType = closeElement.dataset.close;

  if (modalType === "gallery") {
    closeGallery();
  } else if (modalType === "details") {
    closeDetails();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (galleryModal.classList.contains("open")) {
      closeGallery();
    }

    if (detailsModal.classList.contains("open")) {
      closeDetails();
    }

    closeMenu();
  }

  if (galleryModal.classList.contains("open")) {
    if (event.key === "ArrowRight") {
      changeGalleryImage(1);
    } else if (event.key === "ArrowLeft") {
      changeGalleryImage(-1);
    }
  }
});

// =========================================
// 19. SCROLL REVEAL ANIMATIONS
// =========================================

function observeRevealElements() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    for (let i = 0; i < revealElements.length; i++) {
      revealElements[i].classList.add("visible");
    }

    return;
  }

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add("visible");
        observer.unobserve(entries[i].target);
      }
    }
  }, {
    threshold: 0.12
  });

  for (let i = 0; i < revealElements.length; i++) {
    if (!revealElements[i].classList.contains("visible")) {
      revealObserver.observe(revealElements[i]);
    }
  }
}

observeRevealElements();

// =========================================
// 20. CONTACT FORM VALIDATION
// =========================================

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const selectedCar = document.getElementById("selectCar").value;
  const message = document.getElementById("message").value.trim();

  formMessage.className = "form-message";
  formMessage.textContent = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    fullName === "" ||
    email === "" ||
    phone === "" ||
    selectedCar === "" ||
    message === ""
  ) {
    formMessage.textContent = "Please fill in all required fields.";
    formMessage.classList.add("error");

  } else if (fullName.length < 2) {
    formMessage.textContent = "Please enter your full name.";
    formMessage.classList.add("error");

  } else if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.classList.add("error");

  } else if (phoneDigits.length < 7) {
    formMessage.textContent = "Please enter a valid phone number.";
    formMessage.classList.add("error");

  } else if (message.length < 10) {
    formMessage.textContent = "Please write a message of at least 10 characters.";
    formMessage.classList.add("error");

  } else {
    formMessage.textContent =
      "Demo validation successful! No email was sent. " +
      "Please contact FAHEEM DEALER directly to submit your enquiry.";

    formMessage.classList.add("success");
    contactForm.reset();
  }
});

// =========================================
// 21. EMAIL CONFIGURATION
// =========================================

// Contact email element agar HTML mein maujood ho to update karna.
function updateContactEmail() {
  const emailElement = document.getElementById("contactEmail");

  // Element na ho to JavaScript error se bachna.
  if (emailElement) {
    emailElement.textContent = businessEmail;
    emailElement.href = "mailto:" + businessEmail;
  }
}

updateContactEmail();

// =========================================
// 22. FINISH
// =========================================

console.log("FAHEEM DEALER website initialized successfully.");
console.log("Total demo cars:", cars.length);
