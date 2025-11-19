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
    showStudentAnnouncement(); // <-- NEW: Load announcement popup
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

// ==========================
/* ========================== LOAD STUDENT DATA ========================== */
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

// ========================== FEEDBACK FUNCTION ==========================
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

// ========================== TEACHER DASHBOARD FUNCTIONS ==========================
function loadTeacherData() {
  document.getElementById("teacherSubject").textContent = "Web Development";
  const sections = ["A", "B", "C", "D"];
  const sectionList = document.getElementById("sectionList");

  sectionList.innerHTML = sections
    .map(
      (sec) => `
      <div class="leader-card">
        <p>Section ${sec}</p>
        <button class="submit-btn" onclick="openAttendance('${sec}')">Take Attendance</button>
      </div>`
    )
    .join("");
}

// ========== Open Schedule Tab ==========
function openSchedule() {
  const scheduleWindow = window.open("", "_blank");
  scheduleWindow.document.write(`
    <html><head><title>Teacher Schedule</title></head>
    <body style="font-family: Arial; padding: 20px; background: linear-gradient(135deg, #a8edea, #fed6e3);">
      <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
        <h2 style="color:#2563eb;">Weekly Schedule - Web Development</h2>
        <table border="1" cellpadding="10" style="border-collapse:collapse; width:80%;">
          <tr><th>Day</th><th>Time</th><th>Section</th></tr>
          <tr><td>Monday</td><td>10:00 - 11:00 AM</td><td>A</td></tr>
          <tr><td>Tuesday</td><td>11:00 - 12:00 PM</td><td>B</td></tr>
          <tr><td>Wednesday</td><td>1:00 - 2:00 PM</td><td>C</td></tr>
          <tr><td>Thursday</td><td>10:00 - 11:00 AM</td><td>D</td></tr>
          <tr><td>Friday</td><td>11:00 - 12:00 PM</td><td>A</td></tr>
        </table>
      </div>
    </body></html>
  `);
}

// ========== Take Attendance ==========
function openAttendance(section) {
  const newWin = window.open("", "_blank");
  const students = ["Aman", "Priya", "Ravi", "Neha", "Karan"];

  newWin.document.write(`
    <html>
      <head><title>Attendance - Section ${section}</title></head>
      <body style="font-family: Arial; padding: 20px; background: linear-gradient(135deg, #a8edea, #fed6e3);">
        <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
          <h2 style="color:#2563eb;">Attendance for Section ${section}</h2>
          <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
          <table border="1" cellpadding="10" style="border-collapse:collapse; width:80%;">
            <tr><th>Student Name</th><th>Present</th></tr>
            ${students
              .map(
                (s) =>
                  `<tr><td>${s}</td><td><input type='checkbox' id='${s}'></td></tr>`
              )
              .join("")}
          </table>
          <button onclick="saveAttendance()" style="margin-top:15px; background:#2563eb; color:white; border:none; padding:8px 16px; border-radius:8px;">Save Attendance</button>
          <script>
            function saveAttendance() {
              alert('Attendance saved successfully for Section ${section}!');
              window.close();
            }
          </script>
        </div>
      </body>
    </html>
  `);
}

// ========== View Feedback ==========
function openFeedback() {
  const feedbackWindow = window.open("", "_blank");
  feedbackWindow.document.write(`
    <html><head><title>Teacher Feedback</title></head>
    <body style="font-family: Arial; padding: 20px; background: linear-gradient(135deg, #a8edea, #fed6e3);">
      <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
        <h2 style="color:#2563eb;">Student Feedback for Teacher</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="background:#e0f2fe; padding:10px; margin-bottom:10px;">"Great teaching style, very clear explanations!" - Aman</li>
          <li style="background:#dbeafe; padding:10px; margin-bottom:10px;">"More hands-on projects would be great." - Priya</li>
          <li style="background:#bfdbfe; padding:10px; margin-bottom:10px;">"Loved the interactive sessions!" - Ravi</li>
        </ul>
      </div>
    </body></html>
  `);
}

// ========================== NEW TEACHER FEATURES ==========================

// 🧾 Enter Marks
function openMarksEntry() {
  const win = window.open("", "_blank");
  const students = ["Aman", "Priya", "Ravi", "Neha", "Karan"];
  win.document.write(`
    <html><head><title>Enter Marks</title></head>
    <body style="font-family: Arial; background: linear-gradient(135deg, #a8edea, #fed6e3); padding:20px;">
      <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
        <h2 style="color:#2563eb;">Enter Marks for Web Development</h2>
        <form id="marksForm">
          <table border="1" cellpadding="10" style="border-collapse:collapse; width:80%;">
            <tr><th>Student</th><th>Marks (out of 100)</th></tr>
            ${students.map(s => `
              <tr>
                <td>${s}</td>
                <td><input type="number" id="marks_${s}" min="0" max="100" required></td>
              </tr>`).join("")}
          </table>
          <button type="submit" style="margin-top:15px; background:#2563eb; color:white; padding:8px 16px; border:none; border-radius:8px;">Save Marks</button>
        </form>

        <script>
          document.getElementById("marksForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const data = ${JSON.stringify(students)}.map(s => ({
              name: s,
              marks: document.getElementById('marks_'+s).value
            }));
            localStorage.setItem('studentMarks', JSON.stringify(data));
            alert('✅ Marks saved successfully!');
            window.close();
          });
        </script>
      </div>
    </body></html>
  `);
}

// 📊 Result Chart
function openResultChart() {
  const win = window.open("", "_blank");
  const marksData = JSON.parse(localStorage.getItem('studentMarks')) || [
    { name: "Aman", marks: 85 },
    { name: "Priya", marks: 90 },
    { name: "Ravi", marks: 78 },
    { name: "Neha", marks: 88 },
    { name: "Karan", marks: 82 }
  ];
  win.document.write(`
    <html><head><title>Result Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
    <body style="font-family: Arial; background: linear-gradient(135deg, #a8edea, #fed6e3); padding:20px;">
      <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
        <h2 style="color:#2563eb;">Web Development - Marks Chart</h2>
        <canvas id="chart" width="500" height="300"></canvas>
        <script>
          const ctx = document.getElementById('chart').getContext('2d');
          const data = ${JSON.stringify(marksData)};
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: data.map(d => d.name),
              datasets: [{
                label: 'Marks',
                data: data.map(d => d.marks),
                backgroundColor: '#2563eb'
              }]
            },
            options: { scales: { y: { beginAtZero: true, max: 100 } } }
          });
        </script>
      </div>
    </body></html>
  `);
}

// 📢 Announcements
function openAnnouncements() {
  const win = window.open("", "_blank");
  const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];

  win.document.write(`
    <html><head><title>Announcements</title></head>
    <body style="font-family: Arial; background: linear-gradient(135deg, #a8edea, #fed6e3); padding:20px;">
      <div style="background: rgba(255,255,255,0.75); padding:20px; border-radius:12px; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
        <h2 style="color:#2563eb;">Create Announcement</h2>
        <textarea id="announceInput" rows="3" style="width:80%; border:2px solid #2563eb; border-radius:8px; padding:8px;"></textarea><br>
        <button id="postBtn" style="background:#2563eb; color:white; padding:8px 16px; border:none; border-radius:8px; margin-top:10px;">Post Announcement</button>

        <h3 style="margin-top:20px; color:#2563eb;">Previous Announcements</h3>
        <div id="announcementList">${savedAnnouncements.map(a => `<p style='background:#dbeafe; padding:8px; border-radius:6px; margin-bottom:5px;'>${a}</p>`).join("")}</div>

        <script>
          document.getElementById('postBtn').onclick = () => {
            const input = document.getElementById('announceInput').value.trim();
            if(!input) { alert('Please write something!'); return; }
            const list = JSON.parse(localStorage.getItem('announcements')) || [];
            list.unshift(input);
            localStorage.setItem('announcements', JSON.stringify(list));
            alert('📢 Announcement posted!');
            window.location.reload();
          }
        </script>
      </div>
    </body></html>
  `);
}

/* ===========================================================
     ANNOUNCEMENT POPUP — STUDENT SIDE
=========================================================== */

// Load latest announcement when student logs in
function showStudentAnnouncement() {
  const popup = document.getElementById("announcementPopup");
  const text = document.getElementById("announcementText");

  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  const seen = localStorage.getItem("announcementSeen");

  if (announcements.length === 0) return; // No announcements
  if (seen === announcements[0]) return; // Already seen latest announcement

  text.textContent = announcements[0]; // Show latest announcement
  popup.classList.remove("hidden");    // Display popup
}

// Mark as seen
function markAnnouncementSeen() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  if (announcements.length === 0) return;

  // Save the latest announcement as seen
  localStorage.setItem("announcementSeen", announcements[0]);

  // Hide popup
  document.getElementById("announcementPopup").classList.add("hidden");
}

// ================== END OF ORIGINAL JS ==================



/* ===================== APPENDED JS — SAME-TAB TEACHER TOOL =====================
   - Does not modify original functions in file; appended after them.
   - Replaces teacher buttons behavior at runtime so UI opens inside same page.
   - Uses different students per section (default names).
   ============================================================================ */

(function () {
  // Default students per section (you chose 'different' student lists)
  const SECTION_STUDENTS = {
    A: ["Aman", "Riya", "Kunal", "Priya", "Arjun"],
    B: ["Mansi", "Rohan", "Aditya", "Shruti", "Viraj"],
    C: ["Kavya", "Manav", "Nitya", "Rishi", "Zara"]
  };

  // references to elements
  const teacherButtonsGrid = document.getElementById("teacherButtonsGrid");
  const teacherToolArea = document.getElementById("teacherToolArea");

  // keep track of which tool is active: 'attendance' | 'marks' | 'chart' | null
  let activeTool = null;

  // utility to clear tool area
  function clearToolArea() {
    teacherToolArea.innerHTML = "";
  }

  // create section selector UI
  function renderSectionSelector(tool) {
    activeTool = tool;
    clearToolArea();

    // build selector markup
    const selDiv = document.createElement("div");
    selDiv.className = "teacher-tool-card";
    selDiv.style.background = "white";
    selDiv.style.padding = "18px";
    selDiv.style.borderRadius = "10px";
    selDiv.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";

    const title = document.createElement("h3");
    title.style.color = "#2563eb";
    title.style.textAlign = "center";
    title.style.marginBottom = "12px";
    title.style.fontSize = "1.25rem";
    title.textContent = tool === "attendance" ? "Take Attendance" : tool === "marks" ? "Enter Marks" : "View Result Chart";

    const info = document.createElement("div");
    info.style.display = "flex";
    info.style.justifyContent = "center";
    info.style.gap = "8px";
    info.style.marginBottom = "14px";

    // create section buttons A, B, C
    ["A", "B", "C"].forEach(s => {
      const b = document.createElement("button");
      b.className = "sec-btn";
      b.textContent = "Section " + s;
      b.dataset.sec = s;
      b.style.background = "#2563eb";
      b.style.color = "#fff";
      b.style.border = "none";
      b.style.padding = "8px 14px";
      b.style.borderRadius = "8px";
      b.style.cursor = "pointer";
      b.style.fontWeight = "700";
      b.addEventListener("click", () => {
        // when section clicked -> render appropriate UI below
        renderToolForSection(tool, s);
      });
      info.appendChild(b);
    });

    // back button
    const backBtn = document.createElement("div");
    backBtn.style.textAlign = "center";
    backBtn.style.marginTop = "12px";
    const back = document.createElement("button");
    back.textContent = "Back to Dashboard";
    back.className = "submit-btn";
    back.style.background = "#ef4444";
    back.style.border = "none";
    back.style.padding = "8px 12px";
    back.style.color = "#fff";
    back.style.borderRadius = "8px";
    back.style.cursor = "pointer";
    back.addEventListener("click", () => {
      closeToolAndShowButtons();
    });
    backBtn.appendChild(back);

    selDiv.appendChild(title);
    selDiv.appendChild(info);

    // placeholder area where content will be injected
    const contentHolder = document.createElement("div");
    contentHolder.id = "teacherToolContent";
    contentHolder.style.marginTop = "10px";

    selDiv.appendChild(contentHolder);
    selDiv.appendChild(backBtn);

    teacherToolArea.appendChild(selDiv);
    teacherToolArea.classList.remove("hidden");
  }

  // render UI for chosen tool + section
  function renderToolForSection(tool, section) {
    const contentHolder = document.getElementById("teacherToolContent");
    if (!contentHolder) return;
    contentHolder.innerHTML = ""; // clear

    const students = SECTION_STUDENTS[section] || [];

    if (tool === "attendance") {
      const table = document.createElement("table");
      table.className = "data-table";
      table.style.width = "100%";
      table.innerHTML = `
        <thead><tr><th>Student</th><th>Present</th></tr></thead>
        <tbody>
          ${students.map(s => `<tr><td>${s}</td><td style="text-align:center;"><input type="checkbox" data-name="${s}"></td></tr>`).join("")}
        </tbody>
      `;
      contentHolder.appendChild(table);

      const saveBtn = document.createElement("button");
      saveBtn.className = "submit-btn";
      saveBtn.textContent = "Save Attendance";
      saveBtn.style.marginTop = "12px";
      saveBtn.addEventListener("click", () => {
        const checked = Array.from(contentHolder.querySelectorAll('input[type="checkbox"]'))
          .filter(c => c.checked)
          .map(c => c.getAttribute("data-name"));

        // store attendance in localStorage
        try {
          localStorage.setItem("attendance_section_" + section, JSON.stringify({ date: new Date().toISOString(), present: checked }));
        } catch (err) {
          // ignore storage error
        }
        alert("Attendance saved for Section " + section + ". Present: " + (checked.join(", ") || "None"));
      });

      contentHolder.appendChild(saveBtn);
    }

    if (tool === "marks") {
      const table = document.createElement("table");
      table.className = "data-table";
      table.style.width = "100%";
      table.innerHTML = `
        <thead><tr><th>Student</th><th>Marks (0-100)</th></tr></thead>
        <tbody>
          ${students.map(s => `<tr><td>${s}</td><td><input type="number" min="0" max="100" data-name="${s}" id="mark_${section}_${s}" style="width:90px;"></td></tr>`).join("")}
        </tbody>
      `;
      contentHolder.appendChild(table);

      const saveBtn = document.createElement("button");
      saveBtn.className = "submit-btn";
      saveBtn.textContent = "Save Marks";
      saveBtn.style.marginTop = "12px";
      saveBtn.addEventListener("click", () => {
        const inputs = Array.from(contentHolder.querySelectorAll('input[type="number"]'));
        const result = inputs.map(inp => ({ name: inp.getAttribute("data-name"), marks: inp.value === "" ? null : Number(inp.value) }));

        // validation
        const invalid = result.some(r => r.marks !== null && (isNaN(r.marks) || r.marks < 0 || r.marks > 100));
        if (invalid) return alert("Please enter valid marks between 0 and 100, or leave blank.");

        // save
        try {
          localStorage.setItem("studentMarks_section_" + section, JSON.stringify(result));
        } catch (err) { /* ignore */ }

        alert("Marks saved for Section " + section);
      });

      contentHolder.appendChild(saveBtn);
    }

    if (tool === "chart") {
      // get stored marks or create sample
      let stored = [];
      try {
        const raw = localStorage.getItem("studentMarks_section_" + section);
        stored = raw ? JSON.parse(raw) : null;
      } catch (err) {
        stored = null;
      }
      if (!stored) {
        // fallback sample marks
        stored = students.map((s, i) => ({ name: s, marks: 70 + (i * 5) }));
      }

      const canvas = document.createElement("canvas");
      canvas.id = "teacherSectionChart";
      canvas.width = 800;
      canvas.height = 300;
      contentHolder.appendChild(canvas);

      setTimeout(() => {
        const ctx = canvas.getContext("2d");
        // destroy existing chart if any reference stored on canvas
        if (canvas._chartInstance) try { canvas._chartInstance.destroy(); } catch (e) {}
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: stored.map(s => s.name),
            datasets: [{ label: "Marks", data: stored.map(s => s.marks), backgroundColor: "#2563eb" }]
          },
          options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
        });
        canvas._chartInstance = chart;
      }, 60);
    }
  }

  // hide tool and show original buttons
  function closeToolAndShowButtons() {
    teacherToolArea.classList.add("hidden");
    teacherToolArea.innerHTML = ""; // clear content
    teacherButtonsGrid.style.display = ""; // restore grid display
    activeTool = null;
  }

  // override the original openAttendance / openMarksEntry / openResultChart functions at runtime
  // so when the buttons call these function names they open the inline tool instead of popup/new window.
  function replaceOpeners() {
    // replace global functions (they exist earlier - we override them now)
    window.openAttendance = function () {
      teacherButtonsGrid.style.display = "none";
      renderSectionSelector("attendance");
    };
    window.openMarksEntry = function () {
      teacherButtonsGrid.style.display = "none";
      renderSectionSelector("marks");
    };
    window.openResultChart = function () {
      teacherButtonsGrid.style.display = "none";
      renderSectionSelector("chart");
    };
    // leave openSchedule/openAnnouncements/openFeedback as they were (unchanged)
  }

  // attach listeners to teacherButtonsGrid as safety if needed (for other calls)
  function attachRuntime() {
    replaceOpeners();
    // also, ensure that if the teacherButtonsGrid is re-rendered (unlikely), we reapply the override
  }

  // run on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    attachRuntime();
  });
})();
