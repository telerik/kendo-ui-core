package com.kendoui.spring.models;

public class BubblePoint {
    private double x;
    private double y;
    private double size;
    private String category;
    
    public BubblePoint(double x, double y, double size, String category) {
        setX(x);
        setY(y);
        setSize(size);
        setCategory(category);
    }

    public double getSize() {
        return size;
    }

    public void setSize(double size) {
        this.size = size;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
