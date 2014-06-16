package com.kendoui.spring.models;

public class DownloadSpeed
{
    private int WiFiFrom;
    private int WiFiTo;
    private int OpticalFrom;
    private int OpticalTo;
    private String Day;
    
    public DownloadSpeed(int wf, int wt, int of, int ot, String day) {
        this.WiFiFrom = wf;
        this.WiFiTo = wt;
        this.OpticalFrom = of;
        this.OpticalTo = ot;
        this.Day = day;
    }
    
    public int getWiFiFrom() {
        return WiFiFrom;
    }
    public void setWiFiFrom(int wiFiFrom) {
        WiFiFrom = wiFiFrom;
    }
    public int getWiFiTo() {
        return WiFiTo;
    }
    public void setWiFiTo(int wiFiTo) {
        WiFiTo = wiFiTo;
    }
    public int getOpticalTo() {
        return OpticalTo;
    }
    public void setOpticalTo(int opticalTo) {
        OpticalTo = opticalTo;
    }
    public int getOpticalFrom() {
        return OpticalFrom;
    }
    public void setOpticalFrom(int opticalFrom) {
        OpticalFrom = opticalFrom;
    }
    public String getDay() {
        return Day;
    }
    public void setDay(String day) {
        Day = day;
    }
    
    
}