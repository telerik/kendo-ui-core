package com.kendoui.spring.models;


public class Marker {
    private double[] LatLng;
    private String Name;
    
    public Marker(double latitude, double longitude, String name)
    {
        LatLng = new double[] { latitude, longitude };
        Name = name;
    }

    public double[] getLatLng() {
        return LatLng;
    }

    public void setLatLng(double[] latLng) {
        this.LatLng = latLng;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        this.Name = name;
    }
}
