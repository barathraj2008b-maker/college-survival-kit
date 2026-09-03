const studentId = "101";

async function loadDashboard() {
    const response = await fetch(`/dashboard/${studentId}`);
    const data = await response.json();

    document.getElementById("studentName").textContent = data.studentName;
    document.getElementById("studentId").textContent = "Student ID: " + studentId;
    document.getElementById("attendance").textContent = data.averageAttendance + "%";
    document.getElementById("pendingAssignments").textContent = data.pendingAssignments;
    document.getElementById("message").textContent = data.message;
}

async function loadAttendance() {
    const response = await fetch(`/attendance/student/${studentId}`);
    const data = await response.json();

    const attendanceList = document.getElementById("attendanceList");

    data.forEach(record => {
        const item = document.createElement("div");
        item.className = "attendance-item";

        item.innerHTML = `
            <span>${record.subject}</span>
            <strong>${record.percentage}%</strong>
        `;

        attendanceList.appendChild(item);
    });
}

async function loadAssignments() {
    const response = await fetch(`/assignments/student/${studentId}`);
    const data = await response.json();

    const assignmentList = document.getElementById("assignmentList");

    data.forEach(assignment => {
        const item = document.createElement("div");
        item.className = "assignment-item";

        item.innerHTML = `
            <strong>${assignment.title}</strong>
            <p>Subject: ${assignment.subject}</p>
            <p>Due Date: ${assignment.dueDate}</p>
            <p>Status: ${assignment.status}</p>
        `;

        assignmentList.appendChild(item);
    });
}

loadDashboard();
loadAttendance();
loadAssignments();