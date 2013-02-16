package com.kendoui.spring.models;

public class BubbleChartsGroupedDataViewModel extends Medals {
    public BubbleChartsGroupedDataViewModel(Medals medals) {
        super(medals.getYear(), medals.getStanding(), medals.getNumber(), medals.getCountry());
    } 

    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }    
}
