package com.vit.results.results_api.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vit.results.results_api.Mark;
import com.vit.results.results_api.Student;
public interface MarkRepository extends JpaRepository<Mark, Integer> {
    // Method to find all marks for a given student
    List<Mark> findByStudent(Student student);
}
