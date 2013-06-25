package com.kendoui.spring.models;

public class WindDataItem {
    private int dir;
    private String dirText;
    private int category;
    private String categoryText;
    private double frequency;
    
    public WindDataItem(int dir, String dirText, int category, String categoryText, double frequency)
    {
        this.setDir(dir);
        this.setDirText(dirText);
        this.setCategory(category);
        this.setCategoryText(categoryText);
        this.setFrequency(frequency);
    }
    
    public int getDir()
    {
        return this.dir;
    }    
    
    public void setDir(int value)
    {
        this.dir = value;
    }
    
    public String getDirText()
    {
        return this.dirText;
    }    
    
    public void setDirText(String value)
    {
        this.dirText = value;
    }
    
    public int getCategory()
    {
        return this.category;
    }    
    
    public void setCategory(int value)
    {
        this.category = value;
    }
    
    public String getCategoryText()
    {
        return this.categoryText;
    }    
    
    public void setCategoryText(String value)
    {
        this.categoryText = value;
    }
    
    public double getFrequency()
    {
        return this.frequency;
    }    
    
    public void setFrequency(double value)
    {
        this.frequency = value;
    }
}
