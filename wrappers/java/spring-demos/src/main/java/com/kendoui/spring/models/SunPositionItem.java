package com.kendoui.spring.models;

public class SunPositionItem {
    private String time;
    private double altitude;
    private double azimuth;
    
    public SunPositionItem(String time, double altitude, double azimuth) {
        setTime(time);
        setAltitude(altitude);
        setAzimuth(azimuth);
    }
    
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
    
    public double getAltitude() {
        return altitude;
    }

    public void setAltitude(double altitude) {
        this.altitude = altitude;
    }
    
    public double getAzimuth() {
        return azimuth;
    }

    public void setAzimuth(double azimuth) {
        this.azimuth = azimuth;
    }
}
