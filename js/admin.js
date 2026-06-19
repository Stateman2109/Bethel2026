// 🛠️ Fixed: Changed 'const' to 'var' so duplicate script loads won't crash your screen
var supabase = window.supabase.createClient(
  "https://vchzhlmkgdlchdgpuqmw.supabase.co",
  "sb_publishable_i1BmIbtkgL2ZqMHqIsU9GQ_RWU7g7K0",
);

// 🔐 optional: protect page
// supabase.auth.getUser().then(({ data }) => {
//   if (!data.user) {
//     window.location.href = "login.html";
//   }
// });

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
    console.error("Supabase admin loadData error:", error);
    document.getElementById("tableBody").innerHTML =
      "<tr><td colspan='6' style='text-align:center;color:#f88;'>Error loading RSVPs.</td></tr>";
    return;
  }

  console.log("Admin loadData fetched:", data?.length, data);

  allData = data;

  renderTable(data);
  updateStats(data);
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

  data.forEach((user) => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
          <span class="badge ${user.attendance}">
            ${user.attendance}
          </span>
        </td>
        <td>${user.receiver}</td>
        <td class="actions">
          <button onclick="sendOne('${user.phone}')">💬</button>
          <button onclick="sendEmailOne('${user.name}', '${user.email}')">✉️</button>
        </td>
      </tr>
    `;
  });
}

// 📁 EXPORT CSV
function exportCSV() {
  let csv = "Name,Email,Phone,Attendance,Receiver\n";

  allData.forEach((u) => {
    csv += `${u.name},${u.email},${u.phone},${u.attendance},${u.receiver}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-rsvp.csv";
  a.click();
}

loadData();

// ✉️ Send Email to Single User
async function sendEmailOne(userName, userEmail) {
  const message = document.getElementById("message").value;

  if (!message || message.trim() === "") {
    alert("Please write a message first!");
    return;
  }

  if (!userEmail || userEmail === "undefined" || userEmail.trim() === "") {
    alert("❌ Error: This guest does not have an email in the database!");
    return;
  }

  try {
    // Send only the message body; the EmailJS template already adds greeting/signature
    const htmlMessage = message;

    await emailjs.send("service_pu4qeal", "template_zoc1k1t", {
      to_name: userName,
      to_email: userEmail,
      from_name: "Bethel'26 Wedding",
      message: htmlMessage,
      subject: "Important Wedding Update - Bethel'26",
      reply_to: "wedding@bethel26.com",
    });
    console.log(`Email sent to ${userEmail}`);
    alert(`✅ Email sent to ${userName}!`);
  } catch (err) {
    console.error(`Error sending to ${userEmail}:`, err);
    alert(`❌ Error sending email to ${userEmail}. Check console.`);
  }
}

// ✉️ Optimized Email bulk with a safety delay for large numbers
async function sendEmailAll() {
  const message = document.getElementById("message").value;

  if (allData.length === 0) {
    alert("No users found to email.");
    return;
  }

  // Helper function to create a small pause
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  alert(
    `Starting bulk email blast to ${allData.length} guests... Please keep this page open! ⏳`,
  );

  for (let i = 0; i < allData.length; i++) {
    const user = allData[i];

    try {
      // Send only the message body; the EmailJS template already adds greeting/signature
      const htmlMessage = message;

      await emailjs.send("service_pu4qeal", "template_zoc1k1t", {
        to_name: user.name,
        to_email: user.email,
        from_name: "Bethel'26 Wedding",
        message: htmlMessage,
        subject: "Important Wedding Update - Bethel'26",
        reply_to: "wedding@bethel26.com",
      });
      console.log(`[${i + 1}/${allData.length}] Email sent to ${user.email}`);
    } catch (err) {
      console.log(`Error sending to ${user.email}:`, err);
    }

    // 💡 Pause for 1 second before sending the next email so the browser doesn't choke
    await delay(1000);
  }

  alert("Bulk Email Sent Successfully to all guests! 💌");
}
