package com.kendoui.spring.models;

public class AprilSales {
    private int current;
    private int target;
    private String category;
    
    public AprilSales(int current, int target, String category) {
        setCurrent(current);
        setTarget(target);
        setCategory(category);
    }
    
    public int getCurrent() {
        return current;
    }
    
    public void setCurrent(int current) {
        this.current = current;
    }
    
    public int getTarget() {
        return target;
    }
    
    public void setTarget(int target) {
        this.target = target;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
}