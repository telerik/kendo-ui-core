package com.kendoui.spring.models;

public class BulletPoint {
    private double current;
    private double target;
    private String category;
    
    public BulletPoint(double current, double target, String category) {
        setCurrent(current);
        setTarget(target);
        setCategory(category);
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getCurrent() {
        return current;
    }

    public void setCurrent(double current) {
        this.current = current;
    }

    public double getTarget() {
        return target;
    }

    public void setTarget(double target) {
        this.target = target;
    }
}