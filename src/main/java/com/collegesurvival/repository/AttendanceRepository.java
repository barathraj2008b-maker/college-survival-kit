package com.collegesurvival.repository;

import com.collegesurvival.model.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;

import java.util.List;
import java.util.Map;

public interface AttendanceRepository extends MongoRepository<Attendance, String> {

    List<Attendance> findByStudentId(String studentId);

    @Aggregation(pipeline = {
        "{ '$group': { '_id': '$subject', 'averageAttendance': { '$avg': { '$multiply': [ { '$divide': [ '$attendedClasses', '$totalClasses' ] }, 100 ] } } } }",
        "{ '$project': { '_id': 0, 'subject': '$_id', 'averageAttendance': 1 } }"
    })
    List<Map<String, Object>> getAverageAttendanceBySubject();
}