package com.collegesurvival.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attendance")
public class Attendance {

    @Id
    private String id;

    private String studentId;
    private String subject;
    private int totalClasses;
    private int attendedClasses;

    public Attendance() {
    }

    public Attendance(String studentId, String subject, int totalClasses, int attendedClasses) {
        this.studentId = studentId;
        this.subject = subject;
        this.totalClasses = totalClasses;
        this.attendedClasses = attendedClasses;
    }

    public String getId() {
        return id;
    }

    public String getStudentId() {
        return studentId;
    }

    public String getSubject() {
        return subject;
    }

    public int getTotalClasses() {
        return totalClasses;
    }

    public int getAttendedClasses() {
        return attendedClasses;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTotalClasses(int totalClasses) {
        this.totalClasses = totalClasses;
    }

    public void setAttendedClasses(int attendedClasses) {
        this.attendedClasses = attendedClasses;
    }

    public double getPercentage() {
    if (totalClasses == 0) {
        return 0;
    }
    return (attendedClasses * 100.0) / totalClasses;
    }

    public String getComment() {
    double percentage = getPercentage();

    if (percentage >= 95) {
        return "Bro has stronger attendance than the faculty. 🗿";
    } else if (percentage >= 90) {
        return "Bro is attending classes like it's a paid subscription. 🔥";
    } else if (percentage >= 85) {
        return "Okay topper, leave some attendance for the rest of us. 😭";
    } else if (percentage >= 80) {
        return "You're chilling. Attendance won't kill you today. 😎";
    } else if (percentage >= 75) {
        return "Danger avoided. For now. 👀";
    } else if (percentage >= 70) {
        return "Bro is walking on the attendance borderline. ⚠️";
    } else if (percentage >= 65) {
        return "One more bunk and your attendance starts crying. 💀";
    } else if (percentage >= 60) {
        return "Your attendance needs emotional support. 😭";
    } else if (percentage >= 50) {
        return "Bro attends college as a guest. ☠️";
    } else {
        return "At this point, college knows you only from your ID card. 💀";
    }
}
}