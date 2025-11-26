package com.vit.results.results_api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vit.results.results_api.Mark;
import com.vit.results.results_api.Student;
import com.vit.results.results_api.dto.ResultDTO;
import com.vit.results.results_api.dto.SubjectResult;
import com.vit.results.results_api.repository.MarkRepository;
import com.vit.results.results_api.repository.StudentRepository;

@Service
public class ResultService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MarkRepository markRepository;

    public ResultDTO generateStudentResult(String identifier) {
        Student student;
        // Try to parse the identifier as a Long (PRN)
        try {
            Long prnNo = Long.parseLong(identifier);
            // Use the specific findByPrnNo method
            student = studentRepository.findByPrnNo(prnNo)
                .orElseThrow(() -> new RuntimeException("Student not found with PRN: " + identifier));
        } catch (NumberFormatException e) {
            // If it's not a number, treat it as an email and use the specific findByEmail method
            student = studentRepository.findByEmail(identifier)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + identifier));
        }

        // 2. Get all marks for that student
        List<Mark> marks = markRepository.findByStudent(student);
        if (marks.isEmpty()) {
            throw new RuntimeException("No marks found for student: " + student.getRollNo());
        }

        List<SubjectResult> subjectResults = new ArrayList<>();
        double totalGradePoints = 0;
        int totalCredits = 0;

        // 3. Process each subject's marks
        for (Mark mark : marks) {
            int totalMarks = mark.getMseMarks() + mark.getEseMarks();
            String grade = calculateGrade(totalMarks);
            int gradePoint = getGradePoint(grade);
            int credits = mark.getSubject().getCredits();

            subjectResults.add(new SubjectResult(
                mark.getSubject().getSubjectCode(),
                mark.getSubject().getSubjectName(),
                mark.getMseMarks(),
                mark.getEseMarks(),
                totalMarks,
                grade
            ));
            
            totalGradePoints += gradePoint * credits;
            totalCredits += credits;
        }

        // 4. Calculate SGPA
        double sgpa = (totalCredits == 0) ? 0.0 : totalGradePoints / totalCredits;

        // 5. Build the final DTO and return it
        return new ResultDTO(student.getRollNo(), student.getFirstName()+" "+student.getLastName(), subjectResults, sgpa);
    }
    
    private String calculateGrade(int totalMarks) {
        if (totalMarks >= 90) return "S";
        if (totalMarks >= 80) return "A";
        if (totalMarks >= 70) return "B";
        if (totalMarks >= 60) return "C";
        if (totalMarks >= 50) return "D";
        if (totalMarks >= 40) return "E";
        return "F";
    }

    private int getGradePoint(String grade) {
        return switch (grade) {
            case "S" -> 10;
            case "A" -> 9;
            case "B" -> 8;
            case "C" -> 7;
            case "D" -> 6;
            case "E" -> 5;
            default -> 0;
        };
    }
}
