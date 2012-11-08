package com.kendoui.spring.models;

public class PiePoint {
    private String category;
    private double value;
    
    public PiePoint(String category, double value) {
        this.setCategory(category);
        this.setValue(value);
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
