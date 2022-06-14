package com.example.backend.request;

public class myUserDetails {
    private String emailid;
    private String title1;
    private String title2;
    private String country;
    private boolean isStudent;

    public myUserDetails(){

    }

    public boolean getIsStudent() {
        return isStudent;
    }

    public void setIsStudent(boolean is_student) {
        this.isStudent = is_student;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getTitle1() {
        return title1;
    }

    public void setTitle1(String title1) {
        this.title1 = title1;
    }

    public String getTitle2() {
        return title2;
    }

    public void setTitle2(String title2) {
        this.title2 = title2;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
