package com.kendoui.spring.models;

public class BarChartsLocalDataViewModel extends InternetUsers {
    public BarChartsLocalDataViewModel(InternetUsers internetUsers) {
        super(internetUsers.getYear(), internetUsers.getValue(), internetUsers.getCountry());
    }

    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
