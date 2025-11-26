package com.vit.results.results_api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vit.results.results_api.Subject;
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
