package com.collegesurvival.controller;

import com.collegesurvival.dto.Dashboard;
import com.collegesurvival.model.Attendance;
import com.collegesurvival.model.Assignment;
import com.collegesurvival.model.Student;
import com.collegesurvival.repository.AttendanceRepository;
import com.collegesurvival.repository.AssignmentRepository;
import com.collegesurvival.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;
    private final AssignmentRepository assignmentRepository;

    public DashboardController(StudentRepository studentRepository,
                               AttendanceRepository attendanceRepository,
                               AssignmentRepository assignmentRepository) {
        this.studentRepository = studentRepository;
        this.attendanceRepository = attendanceRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @GetMapping("/{studentId}")
    public Dashboard getDashboard(@PathVariable String studentId) {

        Student student = studentRepository.findById(studentId).orElse(null);

        List<Attendance> attendance =
                attendanceRepository.findByStudentId(studentId);

        double averageAttendance = 0;

        if (!attendance.isEmpty()) {
            double total = 0;

            for (Attendance a : attendance) {
                total += a.getPercentage();
            }

            averageAttendance = total / attendance.size();
        }

        List<Assignment> assignments =
            assignmentRepository.findByStudentId(studentId);

        int pending = 0;

        for (Assignment a : assignments) {
            if ("Pending".equalsIgnoreCase(a.getStatus())) {
                pending++;
            }
        }

        String message;

        if (averageAttendance >= 85 && pending <= 1) {
            message = "Bro is actually responsible. Suspicious. 🗿";
        } else if (averageAttendance >= 75 && pending <= 2) {
            message = "You're surviving. Keep going. 😎";
        } else if (averageAttendance >= 60) {
            message = "We need to have a serious conversation. 💀";
        } else {
            message = "BRO. GO TO CLASS. 💀";
        }

        return new Dashboard(
                student != null ? student.getName() : "Unknown Student",
                Math.round(averageAttendance * 100.0) / 100.0,
                pending,
                message
        );
    }
}