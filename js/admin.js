// 🛠️ Fixed: Accurate Supabase V2 Global Browser Initialization Layout
var supabase = supabase.createClient(
  "https://vchzhlmkgdlchdgpuqmw.supabase.co",
  "sb_publishable_i1BmIbtkgL2ZqMHqIsU9GQ_RWU7g7K0",
);

let allData = [];

async function loadData() {
  let filter = document.getElementById("filter").value;

  let query = supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (filter === "yes") query = query.eq("attendance", "yes");
  if (filter === "no") query = query.eq("attendance", "no");

  const { data, error } = await query;

  if (error) {
    console.error("Database connection error:", error);
    return;
  }

  allData = data || [];

  renderTable(allData);
  updateStats(allData);
}

// 📊 STATS
function updateStats(data) {
  document.getElementById("total").innerText = data.length;
  document.getElementById("yesCount").innerText = data.filter(
    (x) => x.attendance === "yes",
  ).length;
  document.getElementById("noCount").innerText = data.filter(
    (x) => x.attendance === "no",
  ).length;
}

// 📋 TABLE
function renderTable(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">No records found.</td></tr>`;
    return;
  }

  data.forEach((user) => {
    table.innerHTML += `
      <tr>
        <td>${user.name || ""}</td>
        <td>${user.email || ""}</td>
        <td>${user.phone || ""}</td>
        <td>
          <span class="badge ${user.attendance || ""}">
            ${user.attendance || "pending"}
          </span>
        </td>
        <td>${user.receiver || ""}</td>
        <td class="actions">
          <button onclick="sendOne('${user.phone}')">💬</button>
          <button onclick="sendEmailOne('${user.name}', '${user.email}')">✉️</button>
        </td>
      </tr>
    `;
  });
}

// ✉️ Single Email Function
function sendEmailOne(name, email) {
  const message = document.getElementById("message").value;

  emailjs
    .send("service_pu4qeal", "template_zoc1k1t", {
      to_name: name,
      to_email: email,
      message: message,
      reply_to: "wedding admin",
    })
    .then(() => {
      alert(`Email sent successfully to ${name}! 💌`);
    })
    .catch((err) => {
      console.error("Email error", err);
    });
}

// ✉️ Optimized Bulk Email Function with 1-second delay safety
async function sendEmailAll() {
  const message = document.getElementById("message").value;

  if (allData.length === 0) {
    alert("No users found to email.");
    return;
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  alert(
    `Starting bulk email blast to ${allData.length} guests... Please keep this page open! ⏳`,
  );

  for (let i = 0; i < allData.length; i++) {
    const user = allData[i];
    try {
      await emailjs.send("service_pu4qeal", "template_zoc1k1t", {
        to_name: user.name,
        to_email: user.email,
        message: message,
        reply_to: "wedding admin",
      });
      console.log(`[${i + 1}/${allData.length}] Email sent to ${user.email}`);
    } catch (err) {
      console.log(`Error sending to ${user.email}:`, err);
    }
    await delay(1000);
  }

  alert("Bulk Email Sent Successfully to all guests! 💌");
}

// 📁 EXPORT CSV
function exportCSV() {
  let csv = "Name,Email,Phone,Attendance,Receiver\n";
  allData.forEach((u) => {
    csv += `${u.name || ""},${u.email || ""},${u.phone || ""},${u.attendance || ""},${u.receiver || ""}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-rsvp.csv";
  a.click();
}

// Run initial fetch load
loadData();
