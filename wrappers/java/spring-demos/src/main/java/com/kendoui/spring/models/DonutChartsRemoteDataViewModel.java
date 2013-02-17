package com.kendoui.spring.models;

public class DonutChartsRemoteDataViewModel extends ScreenResolution {
    public DonutChartsRemoteDataViewModel(ScreenResolution screenResolution) {
        super(screenResolution.getYear(), screenResolution.getResolution(), screenResolution.getShare(), screenResolution.isVisibleInLegend(), screenResolution.getOrderNumber());
    } 
    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }    
}

