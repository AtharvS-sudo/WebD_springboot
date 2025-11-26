package com.vit.results.results_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vit.results.results_api.Student;

// The primary key of Student is Long (for prn_no)
public interface StudentRepository extends JpaRepository<Student, Long> {
    // We can still find by roll number if needed, it just won't be the primary key
    Optional<Student> findByPrnNo(Long prnNo);

    // A specific method for finding by Email
    Optional<Student> findByEmail(String email);
}