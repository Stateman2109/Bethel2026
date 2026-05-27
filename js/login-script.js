
// login-script.js

let weddingSupabase;
let loginSection, dashboardSection, rsvpRows;

// ⚡ WAIT FOR THE BROWSER TO LOAD EVERYTHING COMPLETELY
window.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Supabase safely after library loads
    const sbUrl = "https://bvslvksckxmyirklxmre.supabase.co";
    const sbKey = "sb_publishable_KHM867kk7rujpqEsRkgX1Q_Kg0WJLYh";
    
    if (window.supabase) {
        weddingSupabase = window.supabase.createClient(sbUrl, sbKey);
    } else {
        alert("Supabase library failed to load. Please check your internet connection.");
        return;
    }

    // Assign DOM elements safely
    loginSection = document.getElementById('loginSection');
    dashboardSection = document.getElementById('dashboardSection');
    rsvpRows = document.getElementById('rsvpRows');

    // Handle Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await weddingSupabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Login failed: " + error.message);
        } else {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            fetchRSVPs();
        }
    });

    // Handle Logout Button
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await weddingSupabase.auth.signOut();
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        document.getElementById('loginForm').reset();
    });
});

// Fetch Data function moved outside the wrapper
async function fetchRSVPs() {
    rsvpRows.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Loading RSVPs...</td></tr>";

    const { data, error } = await weddingSupabase.from('rsvp_responses').select('*');

    if (error) {
        alert("Error fetching data: " + error.message);
        return;
    }

    rsvpRows.innerHTML = "";
    if (data.length === 0) {
        rsvpRows.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No RSVPs found.</td></tr>";
        return;
    }

    data.forEach(guest => {
        const row = `<tr>
            <td><strong>${guest.name || ''}</strong></td>
            <td>${guest.email || ''}</td>
            <td>${guest.attendance || ''}</td>
            <td>${guest.receiver === 'groom' ? 'Groom 🤵' : 'Bride 👰'}</td>
            <td>${guest.message || ''}</td>
        </tr>`;
        rsvpRows.innerHTML += row;
    });
}
