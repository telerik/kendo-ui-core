package com.kendoui.spring.models;

public class BoxPlotPoint {
    private double lower;
    private double q1;
    private double median;
    private double q3;
    private double upper;
    private double mean;
    private double[] outliers;
    
    public BoxPlotPoint(double lower,  double q1, double median, double q3, double upper, double mean, double[] outliers){
        this.setLower(lower);
        this.setQ1(q1);
        this.setMedian(median);
        this.setQ3(q3);
        this.setUpper(upper);
        this.setMean(mean);
        this.outliers = outliers;
    }       
    
    public double getLower(){
        return this.lower;
    }
    
    public void setLower(double lower){
        this.lower = lower;
    }
    
    public double getQ1(){
        return this.q1;
    }
    
    public void setQ1(double q1){
        this.q1 = q1;
    }
    
    public double getMedian(){
        return this.median;
    }
    
    public void setMedian(double median){
        this.median = median;
    }
    
    public double getQ3(){
        return this.q3;
    }
    
    public void setQ3(double q3){
        this.q3 = q3;
    }
    
    public double getUpper(){
        return this.upper;
    }
    
    public void setUpper(double upper){
        this.upper = upper;
    }
    
    public double getMean(){
        return this.mean;
    }
    
    public void setMean(double mean){
        this.mean = mean;
    }

    public double[] getOutliers(){
        return this.outliers;
    }       
}
