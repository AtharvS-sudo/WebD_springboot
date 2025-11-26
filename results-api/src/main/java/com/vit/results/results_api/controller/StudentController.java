package com.vit.results.results_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.results.results_api.Student;
import com.vit.results.results_api.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        try {
            Student newStudent = studentService.addStudent(student);
            return ResponseEntity.ok(newStudent);
        } catch (IllegalStateException e) {
            // Catches the validation error from the service
            // and returns a 409 Conflict status with the error message.
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{prnNo}")
    public Student getStudentById(@PathVariable Long prnNo) {
        return studentService.findStudentById(prnNo);
    }
}