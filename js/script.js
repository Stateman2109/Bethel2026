// ⚡ Using a unique variable name to completely bypass the duplicate error
const sbUrl = "https://bvslvksckxmyirklxmre.supabase.co";
const sbKey = "sb_publishable_KHM867kk7rujpqEsRkgX1Q_Kg0WJLYh";

const weddingSupabase = window.supabase.createClient(sbUrl, sbKey);

//     document.getElementById("days").innerHTML = days;
//     document.getElementById("hours").innerHTML = hours;
//     document.getElementById("minutes").innerHTML = minutes;
//     document.getElementById("seconds").innerHTML = seconds;
//   }, 1000);

//   const music = document.getElementById("bgMusic");
//   const musicBtn = document.getElementById("musicBtn");

//   musicBtn.addEventListener("click", () => {
//     if (music.paused) {
//       music.play();
//       musicBtn.innerHTML = "❚❚";
//     } else {
//       music.pause();
//       musicBtn.innerHTML = "♫";
//     }
//   });
//   const menuToggle = document.getElementById("menu-toggle");
//   const nav = document.querySelector("nav");

//   menuToggle.addEventListener("click", () => {
//     nav.classList.toggle("active");

//     if (nav.classList.contains("active")) {
//       menuToggle.innerHTML = "✕";
//     } else {
//       menuToggle.innerHTML = "☰";
//     }
//   });
//   //   particles sections for script
//   const romanticContainer = document.getElementById("romantic-effects");

//   function createEffect() {
//     const effect = document.createElement("span");

//     const items = ["❤", "💍", "✦"];

//     effect.innerHTML = items[Math.floor(Math.random() * items.length)];

//     effect.classList.add("effect");

//     effect.style.left = Math.random() * 100 + "vw";

//     effect.style.fontSize = Math.random() * 25 + 15 + "px";

//     effect.style.animationDuration = Math.random() * 10 + 8 + "s";

//     const colors = [
//       "rgba(200,169,107,0.45)", // Gold
//       "rgba(66,92,66,0.35)", // Emerald Green
//       "rgba(120,140,100,0.30)", // Olive Green
//       "rgba(255,248,230,0.28)",
//       "red", // Cream
//       "green", // Dusty Rose
//     ];

//     effect.style.color = colors[Math.floor(Math.random() * colors.length)];

//     romanticContainer.appendChild(effect);

//     setTimeout(() => {
//       effect.remove();
//     }, 18000);
//   }


// --- 1. LOADER SECTION ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
});

// --- 2. COUNTDOWN TIMER SECTION ---
const targetDate = new Date("Oct 31, 2026 10:00:00").getTime();

setInterval(() => {
  // Grab countdown elements safely
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Only calculate and update if the elements actually exist on the page
  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;
  }
}, 1000);

// --- 3. BACKGROUND MUSIC SECTION ---
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (music && musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.innerHTML = "❚❚";
    } else {
      music.pause();
      musicBtn.innerHTML = "♫";
    }
  });
}

// --- 4. MOBILE NAVIGATION TOGGLE SECTION ---
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
      menuToggle.innerHTML = "✕";
    } else {
      menuToggle.innerHTML = "☰";
    }
  });
}

// --- 5. ROMANTIC PARTICLES SECTION ---
const romanticContainer = document.getElementById("romantic-effects");

// Only run the particle generator if the container exists on the page
if (romanticContainer) {
  function createEffect() {
    const effect = document.createElement("span");
    const items = ["❤", "💍", "✦"];
    effect.innerHTML = items[Math.floor(Math.random() * items.length)];

    effect.classList.add("effect");
    effect.style.left = Math.random() * 100 + "vw";
    effect.style.fontSize = Math.random() * 25 + 15 + "px";
    effect.style.animationDuration = Math.random() * 10 + 8 + "s";

    const colors = [
      "rgba(200,169,107,0.45)", // Gold
      "rgba(66,92,66,0.35)", // Emerald Green
      "rgba(120,140,100,0.30)", // Olive Green
      "rgba(255,248,230,0.28)",
      "red", // Cream
      "green", // Dusty Rose
    ];

    effect.style.color = colors[Math.floor(Math.random() * colors.length)];
    romanticContainer.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 18000);
  }

  setInterval(createEffect, 800);
}

// form rsvp
document.getElementById('rsvpForm').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const attendance = document.getElementById('attendance').value;
  const receiver = document.getElementById('receiver').value;
  const message = document.getElementById('message').value;

  const groomPhone = "2348107232879"; // change
  const bridePhone = "2347037368995"; // change

//   let phone = "";

  if(receiver === "groom"){
    phone = groomPhone;
  } else if(receiver === "bride"){
    phone = bridePhone;
  } else {
    alert("Please choose who to send RSVP to");
    return;
  }

//   const text = `💍 Wedding RSVP 💍

// Name: ${name}
// Email: ${email}
// Attendance: ${attendance}

// Message:
// ${message}`;

//   const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
  alert("RSVP ready on WhatsApp. Please click send!");
  this.reset();
});