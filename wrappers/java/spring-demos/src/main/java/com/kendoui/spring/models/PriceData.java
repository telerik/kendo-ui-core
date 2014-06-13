package com.kendoui.spring.models;

public class PriceData {
    private String name;
    private Float value;
    private String summary;
    
    public PriceData(String name, double value) {
        setName(name);
        setValue(new Float(value));
    }
    
    public PriceData(String name, String summary)
    {
        setName(name);
        setSummary(summary);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
