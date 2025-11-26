package com.vit.results.results_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.results.results_api.Subject;
import com.vit.results.results_api.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/add")
    public Subject addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @GetMapping("/all")
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }
}