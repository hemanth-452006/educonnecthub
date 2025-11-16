// ========================== ELEMENT REFERENCES ==========================
const loginPage = document.getElementById("loginPage");
const studentDashboard = document.getElementById("studentDashboard");
const teacherDashboard = document.getElementById("teacherDashboard");

const loginChoice = document.getElementById("loginChoice");
const studentForm = document.getElementById("studentForm");
const teacherForm = document.getElementById("teacherForm");
const studentError = document.getElementById("studentError");
const teacherError = document.getElementById("teacherError");

// ========================== LOGIN FLOW ==========================
function showLogin(type) {
  loginChoice.classList.add("hidden");
  if (type === "student") studentForm.classList.remove("hidden");
  else teacherForm.classList.remove("hidden");
}

function backToChoice() {
  studentForm.classList.add("hidden");
  teacherForm.classList.add("hidden");
  loginChoice.classList.remove("hidden");
  studentError.classList.add("hidden");
  teacherError.classList.add("hidden");
}

function backToLogin() {
  studentDashboard.classList.add("hidden");
  teacherDashboard.classList.add("hidden");
  loginPage.classList.remove("hidden");
  backToChoice();
}

// ========================== STUDENT LOGIN VALIDATION ==========================
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("studentUser").value.trim();
  const password = document.getElementById("studentPass").value.trim();

  if (username === "student" && password === "1234") {
    loginPage.classList.add("hidden");
    studentDashboard.classList.remove("hidden");
    loadStudentData();
    showStudentAnnouncement();
  } else {
    studentError.classList.remove("hidden");
  }
});

// ========================== TEACHER LOGIN VALIDATION ==========================
teacherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("teacherUser").value.trim();
  const password = document.getElementById("teacherPass").value.trim();

  if (username === "teacher" && password === "1234") {
    loginPage.classList.add("hidden");
    teacherDashboard.classList.remove("hidden");
    loadTeacherData();
  } else {
    teacherError.classList.remove("hidden");
  }
});

// ========================== STUDENT DASHBOARD TABS ==========================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");

    tabButtons.forEach((b) => b.classList.remove("active-tab"));
    btn.classList.add("active-tab");

    tabContents.forEach((section) => {
      section.classList.add("hidden");
      if (section.id === tab) section.classList.remove("hidden");
    });
  });
});

// ========================== LOAD STUDENT DATA ==========================
function loadStudentData() {
  const marksData = [
    { subject: "Web Development", marks: 88 },
    { subject: "DBMS", marks: 79 },
    { subject: "Data Structures", marks: 92 },
    { subject: "OOP", marks: 84 },
  ];

  const marksTable = document.getElementById("marksTable");
  marksTable.innerHTML = marksData
    .map((m) => `<tr><td>${m.subject}</td><td>${m.marks}</td></tr>`)
    .join("");

  const attendanceData = [
    { subject: "Web Development", percent: 96 },
    { subject: "DBMS", percent: 90 },
    { subject: "Data Structures", percent: 72 },
    { subject: "OOP", percent: 68 },
  ];

  const attendanceTable = document.getElementById("attendanceTable");
  attendanceTable.innerHTML = attendanceData
    .map(
      (a) => `
        <tr>
          <td>${a.subject}</td>
          <td class="${a.percent < 75 ? "low-attendance" : ""}">
            ${a.percent}%
          </td>
        </tr>`
    )
    .join("");

  const leaderboardList = document.getElementById("leaderboardList");
  const leaders = [
    { name: "Aman", score: 95 },
    { name: "Priya", score: 90 },
    { name: "Ravi", score: 88 },
    { name: "Neha", score: 85 },
    { name: "Karan", score: 83 },
  ];

  leaderboardList.innerHTML = leaders
    .map(
      (l, index) => `
      <div class="leader-card">
        <h3>Rank ${index + 1}</h3>
        <p>${l.name} - ${l.score}%</p>
      </div>`
    )
    .join("");

  loadMarksChart(marksData);
  loadAttendanceChart(attendanceData);
}

// ========================== FEEDBACK ==========================
function submitFeedback() {
  const feedbackInput = document.getElementById("feedbackInput");
  const feedbackMsg = document.getElementById("feedbackMsg");

  if (feedbackInput.value.trim() === "") {
    alert("Please enter feedback before submitting!");
    return;
  }

  feedbackMsg.classList.remove("hidden");
  feedbackInput.value = "";

  setTimeout(() => {
    feedbackMsg.classList.add("hidden");
  }, 2000);
}

// ========================== CHARTS ==========================
function loadMarksChart(data) {
  const ctx = document.getElementById("marksChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((d) => d.subject),
      datasets: [
        {
          label: "Marks",
          data: data.map((d) => d.marks),
          backgroundColor: "#2563eb",
        },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } },
  });
}

function loadAttendanceChart(data) {
  const ctx = document.getElementById("attendanceChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.subject),
      datasets: [
        {
          data: data.map((d) => d.percent),
          backgroundColor: ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"],
        },
      ],
    },
    options: { responsive: true },
  });
}

// ========================== TEACHER DASHBOARD ==========================
function loadTeacherData() {
  document.getElementById("teacherSubject").textContent = "Web Development";
}

// ==========================================================
// 🌟 NEW FEATURE: SECTIONS + STUDENTS (3 SECTIONS, 3 STUDENTS EACH)
// ==========================================================
function openSections() {
  const win = window.open("", "_blank");

  const sectionData = {
    A: ["Aman", "Riya", "Kunal"],
    B: ["Sneha", "Rohit", "Pooja"],
    C: ["Laksh", "Maya", "Arjun"],
  };

  win.document.write(`
    <html>
    <head><title>Sections</title></head>
    <body style="font-family:Arial; background:#f8fafc; padding:25px;">
      <h2 style="color:#2563eb;">Select a Section</h2>

      <div style="display:flex; gap:20px; margin-top:20px;">
        ${Object.keys(sectionData)
          .map(
            (sec) => `
          <button 
            style="background:#2563eb; color:white; padding:10px 20px; border:none; border-radius:10px;"
            onclick="showStudents('${sec}')">
            Section ${sec}
          </button>`
          )
          .join("")}
      </div>

      <div id="studentView" style="margin-top:30px;"></div>

      <script>
        const sections = ${JSON.stringify(sectionData)};

        function showStudents(sec){
          const container = document.getElementById("studentView");
          const list = sections[sec]
            .map(s => "<li style='padding:8px; background:#dbeafe; margin-bottom:5px; border-radius:6px;'>" + s + "</li>")
            .join("");
          
          container.innerHTML = "<h3 style='color:#2563eb;'>Students in Section " + sec + "</h3><ul style='list-style:none; padding:0; margin-top:10px;'>" + list + "</ul>";
        }
      </script>
    </body>
    </html>
  `);
}

// ========================== EXISTING FUNCTIONS (UNCHANGED) ==========================
function openSchedule() { /* unchanged */ }
function openAttendance(section) { /* unchanged */ }
function openMarksEntry() { /* unchanged */ }
function openResultChart() { /* unchanged */ }
function openFeedback() { /* unchanged */ }
function openAnnouncements() { /* unchanged */ }

// ===========================================================
// ANNOUNCEMENT POPUP — STUDENT SIDE
// ===========================================================
function showStudentAnnouncement() {
  const popup = document.getElementById("announcementPopup");
  const text = document.getElementById("announcementText");

  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  const seen = localStorage.getItem("announcementSeen");

  if (announcements.length === 0) return;
  if (seen === announcements[0]) return;

  text.textContent = announcements[0];
  popup.classList.remove("hidden");
}

function markAnnouncementSeen() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  if (announcements.length === 0) return;

  localStorage.setItem("announcementSeen", announcements[0]);
  document.getElementById("announcementPopup").classList.add("hidden");
}



