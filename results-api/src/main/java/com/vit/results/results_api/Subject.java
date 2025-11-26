package com.vit.results.results_api;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "subjects")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subjectId;

    private String subjectCode;
    private String subjectName;
    private int credits; // This is the column we added
    private Integer maxMse;
    private Integer maxEse;

    // --- Generate Getters and Setters for all fields ---

    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public Integer getMaxMse() {
        return maxMse;
    }

    public void setMaxMse(Integer maxMse) {
        this.maxMse = maxMse;
    }

    public Integer getMaxEse() {
        return maxEse;
    }

    public void setMaxEse(Integer maxEse) {
        this.maxEse = maxEse;
    }
}