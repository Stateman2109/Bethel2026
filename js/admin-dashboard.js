
// admin-dashboard.js
let weddingSupabase;
let rsvpRows;

// ⚡ Wait until the browser loads the network scripts completely
document.addEventListener("DOMContentLoaded", async () => {
    const sbUrl = "https://bvslvksckxmyirklxmre.supabase.co";
    const sbKey = "sb_publishable_KHM867kk7rujpqEsRkgX1Q_Kg0WJLYh";
    
    rsvpRows = document.getElementById('rsvpRows');

    // Safe library check
    if (window.supabase) {
        weddingSupabase = window.supabase.createClient(sbUrl, sbKey);
        
        // Setup logout button actions safely
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await weddingSupabase.auth.signOut();
                window.location.href = "login.html";
            });
        }

        checkAuth();
    } else {
        console.log("Local browser override active. Code will link automatically online.");
    }
});

async function checkAuth() {
    const { data: { session } } = await weddingSupabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
    } else {
        fetchRSVPData();
    }
}

async function fetchRSVPData() {
    if (!rsvpRows) return;
    rsvpRows.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Loading RSVPs...</td></tr>";

    const { data, error } = await weddingSupabase
        .from('rsvp_responses') 
        .select('*');

    if (error) {
        console.error(error);
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
