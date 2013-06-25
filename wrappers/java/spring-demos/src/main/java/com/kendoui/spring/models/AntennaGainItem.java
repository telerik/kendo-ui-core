package com.kendoui.spring.models;

public class AntennaGainItem {
    private double azimuth;
    private double gain;
    
    public AntennaGainItem(double azimuth, double gain) {
        setAzimuth(azimuth);
        setGain(gain);
    }
    
    public double getAzimuth() {
        return azimuth;
    }

    public void setAzimuth(double azimuth) {
        this.azimuth = azimuth;
    }
    
    public double getGain() {
        return gain;
    }

    public void setGain(double gain) {
        this.gain = gain;
    }
}
