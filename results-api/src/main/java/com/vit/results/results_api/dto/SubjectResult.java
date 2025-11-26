package com.vit.results.results_api.dto;

public record SubjectResult(
    String subjectCode,
    String subjectName,
    int mseMarks,
    int eseMarks,
    int totalMarks,
    String grade
) {}
