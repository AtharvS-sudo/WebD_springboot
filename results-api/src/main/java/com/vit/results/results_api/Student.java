package com.vit.results.results_api;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(name = "prn_no")
    private Long prnNo; // Using Long for bigint

    private String firstName;
    private String lastName;
    private String branch;
    private String rollNo;
    private String year; 

    @Column(name = "`div`") // Wrap the column name in backticks
    private String div; 
    
    private String email;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // This annotation prevents the infinite loop
    private List<Mark> marks = new ArrayList<>();

    // --- Generate Getters and Setters for all fields ---

    public Long getPrnNo() {
        return prnNo;
    }

    public void setPrnNo(Long prnNo) {
        this.prnNo = prnNo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getDiv() {
        return div;
    }

    public void setDiv(String div) {
        this.div = div;
    }

    // --- GETTERS AND SETTERS FOR THE MARKS LIST ---
    public List<Mark> getMarks() {
        return marks;
    }

    public void setMarks(List<Mark> marks) {
        this.marks = marks;
    }
}