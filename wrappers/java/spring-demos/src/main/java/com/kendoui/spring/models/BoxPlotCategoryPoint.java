package com.kendoui.spring.models;

public class BoxPlotCategoryPoint extends BoxPlotPoint {
    private int year;
    
    public BoxPlotCategoryPoint(int year, double lower,  double q1, double median, double q3, double upper, double mean, double[] outliers){
        super(lower, q1, median, q3, upper, mean, outliers);
        this.setYear(year);        
    }  
    
    public int getYear(){
        return this.year;
    }    
    
    public void setYear(int year){
        this.year = year;
    }
}
