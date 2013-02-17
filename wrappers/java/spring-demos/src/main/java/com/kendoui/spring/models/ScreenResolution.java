package com.kendoui.spring.models;

public class ScreenResolution {
    private String year;
    private String resolution;
    private int share;
    private boolean visibleInLegend;
    private int orderNumber;
    
    public ScreenResolution(String year, String resolution, int share, boolean visibleInLegend, int orderNumber) {
        setYear(year);
        setResolution(resolution);
        setShare(share);
        setVisibleInLegend(visibleInLegend);
        setOrderNumber(orderNumber);
    }
    
    public String getYear() {
        return year;
    }
    
    public void setYear(String year) {
        this.year = year;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public int getShare() {
        return share;
    }

    public void setShare(int share) {
        this.share = share;
    }

    public boolean isVisibleInLegend() {
        return visibleInLegend;
    }
    
    public void setVisibleInLegend(boolean visibleInLegend) {
        this.visibleInLegend = visibleInLegend;
    }

    public int getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }
}
