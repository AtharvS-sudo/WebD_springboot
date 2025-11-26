package com.vit.results.results_api.dto;
import java.util.List;
public record ResultDTO(
    String regNo,
    String studentName,
    List<SubjectResult> subjectResults,
    double sgpa
) {}
