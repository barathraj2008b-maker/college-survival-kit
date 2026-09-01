package com.collegesurvival.dto;

public class Dashboard {

    private String studentName;
    private double averageAttendance;
    private int pendingAssignments;
    private String message;

    public Dashboard() {
    }

    public Dashboard(String studentName, double averageAttendance,
                     int pendingAssignments, String message) {
        this.studentName = studentName;
        this.averageAttendance = averageAttendance;
        this.pendingAssignments = pendingAssignments;
        this.message = message;
    }

    public String getStudentName() {
        return studentName;
    }

    public double getAverageAttendance() {
        return averageAttendance;
    }

    public int getPendingAssignments() {
        return pendingAssignments;
    }

    public String getMessage() {
        return message;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setAverageAttendance(double averageAttendance) {
        this.averageAttendance = averageAttendance;
    }

    public void setPendingAssignments(int pendingAssignments) {
        this.pendingAssignments = pendingAssignments;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}