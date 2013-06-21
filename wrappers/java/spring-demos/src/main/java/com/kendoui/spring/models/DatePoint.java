package com.kendoui.spring.models;


public class DatePoint {
    private String date;
    private double value;
    
    public DatePoint(double value, String date) {
        setValue(value);
        setDate(date);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
