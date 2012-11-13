package com.kendoui.spring.models;

public class PricePerformance {
    private String family;
    private String model;
    private int price;
    private int performance;
    
    public PricePerformance(String family, String model, int price, int performance) {
        setFamily(family);
        setModel(model);
        setPrice(price);
        setPerformance(performance);
    }
    
    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }
    
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
    
    public int getPerformance() {
        return performance;
    }

    public void setPerformance(int performance) {
        this.performance = performance;
    }
    
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
