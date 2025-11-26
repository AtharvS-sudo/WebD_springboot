package com.vit.results.results_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vit.results.results_api.Mark;
import com.vit.results.results_api.Student;
import com.vit.results.results_api.Subject;
import com.vit.results.results_api.repository.MarkRepository;
import com.vit.results.results_api.repository.StudentRepository;
import com.vit.results.results_api.repository.SubjectRepository;

@Service
public class MarkService {
    @Autowired
    private MarkRepository markRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    public Mark addMark(Long prnNo, Integer subjectId, int mseMarks, int eseMarks) {
        Student student = studentRepository.findById(prnNo)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Mark newMark = new Mark();
        newMark.setStudent(student);
        newMark.setSubject(subject);
        newMark.setMseMarks(mseMarks);
        newMark.setEseMarks(eseMarks);

        return markRepository.save(newMark);
    }
}