package com.kendoui.spring.models;

public class ScreenResolutionRemoteDataViewModel extends ScreenResolution {
    public ScreenResolutionRemoteDataViewModel(ScreenResolution screenResolution) {
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

