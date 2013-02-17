package com.kendoui.spring.models;

public class DonutChartsBasicUsageViewModel extends PiePoint {
    public DonutChartsBasicUsageViewModel(PiePoint piePoint) {
        super(piePoint.getCategory(), piePoint.getValue());
    } 
    
    public DonutChartsBasicUsageViewModel(String category, double value, String color) {
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
