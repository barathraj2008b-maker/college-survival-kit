package com.collegesurvival.repository;

import com.collegesurvival.model.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssignmentRepository extends MongoRepository<Assignment, String> {

    List<Assignment> findByStudentId(String studentId);
}