// ===============================
// 1. SUPABASE (SAFE LOAD)
// ===============================
let weddingSupabase = null;

if (typeof window.supabase !== "undefined") {
  const sbUrl = "https://vchzhlmkgdlchdgpuqmw.supabase.co";
  const sbKey = "sb_publishable_i1BmIbtkgL2ZqMHqIsU9GQ_RWU7g7K0";

  weddingSupabase = window.supabase.createClient(sbUrl, sbKey);
  console.log("Supabase ready:", !!window.supabase, !!weddingSupabase);
  window.weddingSupabase = weddingSupabase;
}

// ===============================
// 2. RUN AFTER PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // LOADER
  // ===============================
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    });
  }

  // ===============================
  // MOBILE NAV TOGGLE
  // ===============================
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.innerHTML = nav.classList.contains("active") ? "✕" : "☰";
    });
  }

  // ===============================
  // BACKGROUND MUSIC
  // ===============================
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

  // ===============================
  // COUNTDOWN TIMER
  // ===============================
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const targetDate = new Date("Oct 31, 2026 10:00:00").getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      daysEl.innerHTML = days;
      hoursEl.innerHTML = hours;
      minutesEl.innerHTML = minutes;
      secondsEl.innerHTML = seconds;
    }, 1000);
  }

  // ===============================
  // ROMANTIC EFFECTS
  // ===============================
  const romanticContainer = document.getElementById("romantic-effects");

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
        "rgba(200,169,107,0.45)",
        "rgba(66,92,66,0.35)",
        "rgba(120,140,100,0.30)",
        "rgba(255,248,230,0.28)",
        "red",
        "green",
      ];

      effect.style.color = colors[Math.floor(Math.random() * colors.length)];

      romanticContainer.appendChild(effect);

      setTimeout(() => {
        effect.remove();
      }, 18000);
    }

    setInterval(createEffect, 800);
  }

  // ===============================
  // RSVP FORM (SAFE)
  // ===============================
  const rsvpForm = document.getElementById("rsvpForm");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const number = document.getElementById("number")?.value.trim();
      const attendance = document.getElementById("attendance")?.value;
      const receiver = document.getElementById("receiver")?.value || null;
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !number || !attendance) {
        alert(
          "Please fill in your name, email, phone number, and attendance before submitting.",
        );
        return;
      }

      if (!weddingSupabase) {
        alert(
          "Sorry, RSVP submission is not available right now. Please try again later.",
        );
        return;
      }

      try {
        const { data, error } = await weddingSupabase.from("rsvps").insert([
          {
            name,
            email,
            phone: number,
            attendance,
            receiver,
            message,
          },
        ]);

        if (error) {
          console.error("Supabase error:", error);
          alert("Could not save RSVP. Please try again or contact the couple.");
          return;
        }

        alert("RSVP submitted successfully. Thank you!");
        this.reset();
      } catch (saveError) {
        console.error("Supabase insert failed:", saveError);
        alert("Could not save RSVP. Please try again or contact the couple.");
      }
    });
  }
});
