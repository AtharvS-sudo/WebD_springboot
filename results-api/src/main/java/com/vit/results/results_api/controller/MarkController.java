package com.vit.results.results_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.results.results_api.Mark;
import com.vit.results.results_api.dto.MarkRequest;
import com.vit.results.results_api.service.MarkService;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:5173")
public class MarkController {

    @Autowired
    private MarkService markService;

    @PostMapping("/add")
    public ResponseEntity<?> addMark(@RequestBody MarkRequest request) {
        try {
            Mark newMark = markService.addMark(request.prnNo, request.subjectId, request.mseMarks, request.eseMarks);
            // On success, return 200 OK with the new mark object
            return ResponseEntity.ok(newMark);
        } catch (RuntimeException e) {
            // If the service throws an error (e.g., "Student not found" or "Subject not found"),
            // catch it and return a 404 Not Found status with the specific error message.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}