package com.vit.results.results_api;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "marks")
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer markId;

    private int mseMarks;
    private int eseMarks;

    // We link to the entire Student and Subject objects
    @ManyToOne
    @JoinColumn(name = "prn_no")
    @JsonBackReference
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    
    // NOTE: We don't need the 'total' field here, 
    // as it's a generated column in the DB and our service calculates it anyway.

    // --- Generate Getters and Setters for all fields ---

    public Integer getMarkId() {
        return markId;
    }

    public void setMarkId(Integer markId) {
        this.markId = markId;
    }

    public int getMseMarks() {
        return mseMarks;
    }

    public void setMseMarks(int mseMarks) {
        this.mseMarks = mseMarks;
    }

    public int getEseMarks() {
        return eseMarks;
    }

    public void setEseMarks(int eseMarks) {
        this.eseMarks = eseMarks;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}