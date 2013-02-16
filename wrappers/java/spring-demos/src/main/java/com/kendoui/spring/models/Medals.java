package com.kendoui.spring.models;

public class Medals {
    private int year;
    private int standing;
    private int number; 
    private String country; 
    
    public Medals(int year, int standing, int number, String country) {
        setYear(year);
        setStanding(standing);
        setNumber(number);
        setCountry(country);
    }
    
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
    
    public int getStanding() {
        return standing;
    }

    public void setStanding(int standing) {
        this.standing = standing;
    }
    
    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
    
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
