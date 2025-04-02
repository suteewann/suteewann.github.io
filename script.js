'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Apply delay from data-reveal-delay
revealElements.forEach(element => {
  const delay = element.dataset.revealDelay || "0s";
  element.style.transition = `transform 1s ease-in-out ${delay}, opacity 1s ease-in-out ${delay}`;
});

// Add initial styles for animation
document.addEventListener("DOMContentLoaded", () => {
  revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = element.classList.contains("image") ? "translateX(-100px)" : "translateX(100px)";
  });
});

// Add animation class on reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateX(0)";
    }
  });
}, { threshold: 0.3 });

revealElements.forEach(element => observer.observe(element));
