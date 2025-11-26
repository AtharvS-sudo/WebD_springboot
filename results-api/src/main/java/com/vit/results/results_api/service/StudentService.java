package com.vit.results.results_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vit.results.results_api.Student;
import com.vit.results.results_api.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) {
        // Validation Check 1: Does a student with this PRN already exist?
        if (studentRepository.findByPrnNo(student.getPrnNo()).isPresent()) {
            throw new IllegalStateException("Error: A student with PRN " + student.getPrnNo() + " already exists.");
        }

        // Validation Check 2: Does a student with this email already exist?
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new IllegalStateException("Error: A student with email " + student.getEmail() + " already exists.");
        }
        
        // If both checks pass, then it's safe to save the new student.
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student findStudentById(Long prnNo) {
        return studentRepository.findById(prnNo)
            .orElseThrow(() -> new RuntimeException("Student not found with PRN: " + prnNo));
    }
}