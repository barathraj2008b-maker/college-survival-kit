package com.collegesurvival.controller;

import com.collegesurvival.model.Attendance;
import com.collegesurvival.repository.AttendanceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceRepository repository;

    public AttendanceController(AttendanceRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return repository.save(attendance);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }

    @GetMapping("/student/{studentId}")
    public List<Attendance> getStudentAttendance(@PathVariable String studentId) {
        return repository.findByStudentId(studentId);
}

    @PutMapping("/{id}")
    public Attendance updateAttendance(@PathVariable String id, @RequestBody Attendance attendance) {
        attendance.setId(id);
        return repository.save(attendance);
    }

    @DeleteMapping("/{id}")
    public String deleteAttendance(@PathVariable String id) {
        repository.deleteById(id);
        return "Attendance deleted successfully";
    }

   @GetMapping("/average")
    public List<Map<String, Object>> getAverageAttendance() {
        return repository.getAverageAttendanceBySubject();
    }
}