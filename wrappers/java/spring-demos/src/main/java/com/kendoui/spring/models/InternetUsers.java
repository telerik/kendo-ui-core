package com.kendoui.spring.models;

public class InternetUsers {
    private int year;
    private double value;
    private String country;
    
    public InternetUsers(int year, double value, String country) {
        setYear(year);
        setValue(value);
        setCountry(country);
    }
    
    public int getYear() {
        return year;
    }
    
    public void setYear(int year) {
        this.year = year;
    }
    
    public double getValue() {
        return value;
    }
    
    public void setValue(double value) {
        this.value = value;
    }
    
    public String getCountry() {
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
}
