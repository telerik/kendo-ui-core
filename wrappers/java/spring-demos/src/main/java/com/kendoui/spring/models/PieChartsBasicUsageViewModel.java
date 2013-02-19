package com.kendoui.spring.models;

public class PieChartsBasicUsageViewModel extends PiePoint {
    public PieChartsBasicUsageViewModel(PiePoint piePoint) {
        super(piePoint.getCategory(), piePoint.getValue());
    } 
    
    public PieChartsBasicUsageViewModel(String category, double value, String color) {
        super (category, value);
        this.setColor(color);
    }

    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }    
}