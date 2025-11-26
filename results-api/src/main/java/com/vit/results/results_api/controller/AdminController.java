package com.vit.results.results_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.results.results_api.dto.AdminLoginDTO;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    // --- Hardcoded Admin Credentials ---
    private final String ADMIN_EMAIL = "djangam4805@gmail.com";
    private final String ADMIN_PASSWORD = "djangam";

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginDTO loginDTO) {
        if (ADMIN_EMAIL.equals(loginDTO.getEmail()) && ADMIN_PASSWORD.equals(loginDTO.getPassword())) {
            // If credentials match, send a success response
            return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        } else {
            // If they don't match, send an unauthorized error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials\"}");
        }
    }
}