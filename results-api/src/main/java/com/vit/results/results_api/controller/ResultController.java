package com.vit.results.results_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.results.results_api.dto.ResultDTO;
import com.vit.results.results_api.service.ResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173") // IMPORTANT: Allows React app to call this API
public class ResultController {

    @Autowired
    private ResultService resultService;

    @GetMapping("/{identifier}")
    public ResponseEntity<?> getResultByIdentifier(@PathVariable String identifier) {
        try {
            ResultDTO result = resultService.generateStudentResult(identifier);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            // Return a 404 Not Found status with the error message
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
