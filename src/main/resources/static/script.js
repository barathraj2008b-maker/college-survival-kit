let studentId = "";


/* Load selected student's dashboard */

async function loadStudent() {

    const input =
        document.getElementById("studentIdInput").value.trim();

    const errorMessage =
        document.getElementById("studentIdError");


    errorMessage.textContent = "";


    if (input === "") {

        errorMessage.textContent =
            "Please enter Student ID.";

        return;
    }


    studentId = input;


    try {

        const response =
            await fetch(`/dashboard/${studentId}`);


        if (!response.ok) {

            throw new Error("Student not found");

        }


        const data =
            await response.json();


        /*
         * Backend currently returns null student
         * when the ID does not exist.
         */

        if (
            !data ||
            data.studentName === null ||
            data.studentName === "Unknown Student"
        ) {

            throw new Error("Student not found");

        }


        errorMessage.textContent = "";


        await loadDashboard();

        await loadAttendance();

        await loadAssignments();


    } catch (error) {

        studentId = "";


        errorMessage.textContent =
            "Invalid Student ID. Please check your Student ID.";

    }
}


/* Register a new student */

async function registerStudent() {

    const name =
        document.getElementById("newStudentName").value.trim();

    const id =
        document.getElementById("newStudentId").value.trim();

    const rollNumber =
        document.getElementById("newRollNumber").value.trim();

    const department =
        document.getElementById("newDepartment").value.trim();

    const year =
        document.getElementById("newYear").value;


    if (
        name === "" ||
        id === "" ||
        rollNumber === "" ||
        department === "" ||
        year === ""
    ) {

        alert("Please fill all student details.");

        return;
    }


    const response =
        await fetch("/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id: id,

                name: name,

                rollNumber: rollNumber,

                department: department,

                year: Number(year)

            })

        });


    if (response.ok) {

        alert("Student registered successfully.");


        document.getElementById(
            "newStudentName"
        ).value = "";


        document.getElementById(
            "newStudentId"
        ).value = "";


        document.getElementById(
            "newRollNumber"
        ).value = "";


        document.getElementById(
            "newDepartment"
        ).value = "";


        document.getElementById(
            "newYear"
        ).value = "";


        document.getElementById(
            "studentIdInput"
        ).value = id;


        await loadStudent();


    } else {

        alert("Could not register student.");

    }
}


/* Load dashboard information */

async function loadDashboard() {

    const response =
        await fetch(`/dashboard/${studentId}`);


    const data =
        await response.json();


    document.getElementById("studentName")
        .textContent = data.studentName;


    document.getElementById("studentId")
        .textContent =
        "Student ID: " + studentId;


    document.getElementById("attendance")
        .textContent =
        data.averageAttendance + "%";


    document.getElementById("pendingAssignments")
        .textContent =
        data.pendingAssignments;


    document.getElementById("message")
        .textContent =
        data.message;
}


/* Load attendance */

async function loadAttendance() {

    const response =
        await fetch(
            `/attendance/student/${studentId}`
        );


    const data =
        await response.json();


    const attendanceList =
        document.getElementById(
            "attendanceList"
        );


    attendanceList.innerHTML = "";


    if (data.length === 0) {

        attendanceList.innerHTML =
            "No attendance records found.";

        return;
    }


    data.forEach(record => {

        const item =
            document.createElement("div");


        item.className =
            "attendance-item";


        const percentage =
            Number(record.percentage);


        item.innerHTML = `

            <div>

                <strong>
                    ${record.subject}
                </strong>

                <strong>
                    ${percentage.toFixed(2)}%
                </strong>

            </div>


            <div class="progress-background">

                <div
                    class="progress-bar"
                    style="width: ${Math.min(percentage, 100)}%"
                >
                </div>

            </div>


            <p class="attendance-info">

                ${record.attendedClasses}
                /
                ${record.totalClasses}
                classes attended

            </p>


            <div class="attendance-buttons">

                <button
                    class="small-button"
                    onclick="editAttendance('${record.id}')"
                >
                    Edit
                </button>


                <button
                    class="small-button delete-button"
                    onclick="deleteAttendance('${record.id}')"
                >
                    Delete
                </button>

            </div>

        `;


        attendanceList.appendChild(item);

    });
}


/* Add attendance */

async function addAttendance() {

    if (studentId === "") {

        alert("Please enter Student ID first.");

        return;
    }


    const subject =
        document.getElementById(
            "attendanceSubject"
        ).value.trim();


    const totalClasses =
        document.getElementById(
            "totalClasses"
        ).value;


    const attendedClasses =
        document.getElementById(
            "attendedClasses"
        ).value;


    if (
        subject === "" ||
        totalClasses === "" ||
        attendedClasses === ""
    ) {

        alert("Please fill all attendance fields.");

        return;
    }


    if (
        Number(attendedClasses) >
        Number(totalClasses)
    ) {

        alert(
            "Attended classes cannot be greater than total classes."
        );

        return;
    }


    const response =
        await fetch("/attendance", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                studentId: studentId,

                subject: subject,

                totalClasses:
                    Number(totalClasses),

                attendedClasses:
                    Number(attendedClasses)

            })

        });


    if (response.ok) {

        alert("Attendance added successfully.");


        document.getElementById(
            "attendanceSubject"
        ).value = "";


        document.getElementById(
            "totalClasses"
        ).value = "";


        document.getElementById(
            "attendedClasses"
        ).value = "";


        await loadAttendance();

        await loadDashboard();


    } else {

        alert("Failed to add attendance.");

    }
}


/* Edit attendance */

async function editAttendance(id) {

    const response =
        await fetch(
            `/attendance/student/${studentId}`
        );


    const data =
        await response.json();


    const record =
        data.find(item => item.id === id);


    if (!record) {

        alert("Attendance record not found.");

        return;
    }


    const totalClasses =
        prompt(
            "Enter total classes:",
            record.totalClasses
        );


    if (totalClasses === null) {
        return;
    }


    const attendedClasses =
        prompt(
            "Enter attended classes:",
            record.attendedClasses
        );


    if (attendedClasses === null) {
        return;
    }


    if (
        Number(attendedClasses) >
        Number(totalClasses)
    ) {

        alert(
            "Attended classes cannot be greater than total classes."
        );

        return;
    }


    const updateResponse =
        await fetch(
            `/attendance/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    studentId: studentId,

                    subject:
                        record.subject,

                    totalClasses:
                        Number(totalClasses),

                    attendedClasses:
                        Number(attendedClasses)

                })

            }
        );


    if (updateResponse.ok) {

        alert("Attendance updated successfully.");

        await loadAttendance();

        await loadDashboard();


    } else {

        alert("Failed to update attendance.");

    }
}


/* Delete attendance */

async function deleteAttendance(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this attendance record?"
        );


    if (!confirmDelete) {
        return;
    }


    const response =
        await fetch(
            `/attendance/${id}`,
            {
                method: "DELETE"
            }
        );


    if (response.ok) {

        alert("Attendance deleted successfully.");

        await loadAttendance();

        await loadDashboard();


    } else {

        alert("Failed to delete attendance.");

    }
}


/* Load assignments */

async function loadAssignments() {

    const response =
        await fetch(
            `/assignments/student/${studentId}`
        );


    const data =
        await response.json();


    const assignmentList =
        document.getElementById(
            "assignmentList"
        );


    assignmentList.innerHTML = "";


    if (data.length === 0) {

        assignmentList.innerHTML =
            "No assignments found.";

        return;
    }


    data.forEach(assignment => {

        const item =
            document.createElement("div");


        item.className =
            "assignment-item";


        item.innerHTML = `

            <strong>
                ${assignment.title}
            </strong>


            <p>
                Subject: ${assignment.subject}
            </p>


            <p>
                Status: ${assignment.status}
            </p>


            <div class="assignment-buttons">

                <button
                    class="small-button"
                    onclick="editAssignment('${assignment.id}')"
                >
                    Edit
                </button>


                <button
                    class="small-button delete-button"
                    onclick="deleteAssignment('${assignment.id}')"
                >
                    Delete
                </button>

            </div>

        `;


        assignmentList.appendChild(item);

    });
}


/* Add assignment */

async function addAssignment() {

    if (studentId === "") {

        alert("Please enter Student ID first.");

        return;
    }


    const title =
        document.getElementById(
            "assignmentTitle"
        ).value.trim();


    const subject =
        document.getElementById(
            "assignmentSubject"
        ).value.trim();


    const status =
        document.getElementById(
            "assignmentStatus"
        ).value;


    if (title === "" || subject === "") {

        alert("Please fill assignment details.");

        return;
    }


    const response =
        await fetch("/assignments", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                studentId: studentId,

                title: title,

                subject: subject,

                status: status

            })

        });


    if (response.ok) {

        alert("Assignment added successfully.");


        document.getElementById(
            "assignmentTitle"
        ).value = "";


        document.getElementById(
            "assignmentSubject"
        ).value = "";


        await loadAssignments();

        await loadDashboard();


    } else {

        alert("Could not add assignment.");

    }
}


/* Edit assignment */

async function editAssignment(id) {

    const response =
        await fetch(
            `/assignments/student/${studentId}`
        );


    const data =
        await response.json();


    const assignment =
        data.find(item => item.id === id);


    if (!assignment) {

        alert("Assignment not found.");

        return;
    }


    const title =
        prompt(
            "Enter assignment title:",
            assignment.title
        );


    if (title === null) {
        return;
    }


    const subject =
        prompt(
            "Enter subject:",
            assignment.subject
        );


    if (subject === null) {
        return;
    }


    const status =
        prompt(
            "Enter status (Pending or Completed):",
            assignment.status
        );


    if (status === null) {
        return;
    }


    const updateResponse =
        await fetch(
            `/assignments/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    studentId: studentId,

                    title: title,

                    subject: subject,

                    status: status

                })

            }
        );


    if (updateResponse.ok) {

        alert("Assignment updated successfully.");

        await loadAssignments();

        await loadDashboard();


    } else {

        alert("Failed to update assignment.");

    }
}


/* Delete assignment */

async function deleteAssignment(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this assignment?"
        );


    if (!confirmDelete) {
        return;
    }


    const response =
        await fetch(
            `/assignments/${id}`,
            {
                method: "DELETE"
            }
        );


    if (response.ok) {

        alert("Assignment deleted successfully.");

        await loadAssignments();

        await loadDashboard();


    } else {

        alert("Failed to delete assignment.");

    }
}