package com.collegesurvival.controller;

import com.collegesurvival.model.Assignment;
import com.collegesurvival.repository.AssignmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    private final AssignmentRepository repository;

    public AssignmentController(AssignmentRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Assignment addAssignment(@RequestBody Assignment assignment) {
        return repository.save(assignment);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return repository.findAll();
    }

    @GetMapping("/student/{studentId}")
    public List<Assignment> getStudentAssignments(@PathVariable String studentId) {
        return repository.findByStudentId(studentId);
    }

   @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable String id, @RequestBody Assignment assignment) {
        assignment.setId(id);
        return repository.save(assignment);
    }

    @DeleteMapping("/{id}")
    public String deleteAssignment(@PathVariable String id) {
        repository.deleteById(id);
        return "Assignment deleted successfully";
    }
}