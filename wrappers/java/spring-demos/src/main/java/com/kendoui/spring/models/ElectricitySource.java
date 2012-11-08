package com.kendoui.spring.models;

public class ElectricitySource {
    private String source;
    private int percentage;
    private Boolean explode;

    public ElectricitySource(String source, int percentage, Boolean explode)
    {
        this.setSource(source);
        this.setPercentage(percentage);
        this.setExplode(explode);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public Boolean getExplode() {
        return explode;
    }

    public void setExplode(Boolean explode) {
        this.explode = explode;
    }
}
