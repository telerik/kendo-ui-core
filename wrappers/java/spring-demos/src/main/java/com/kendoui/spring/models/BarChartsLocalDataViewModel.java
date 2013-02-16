package com.kendoui.spring.models;

public class BarChartsLocalDataViewModel extends BlogComments {
    public BarChartsLocalDataViewModel(BlogComments blogComments) {
        super(blogComments.getBlog(), blogComments.getDay(), blogComments.getValue());
    }

    private String userColor;

    public String getUserColor() {
        return userColor;
    }

    public void setUserColor(String userColor) {
        this.userColor = userColor;
    }
}
