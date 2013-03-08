package com.kendoui.spring.models;

public class CompensationStats {
    private String year;
    private double hourly;
    private double change;
    private double direct;
    private SocialBenefits[] benefits;
    
    public CompensationStats() {
    }
    
    public CompensationStats(String year, double hourly, double change, double direct, SocialBenefits[] benefits) {
        this.year = year;
        this.hourly = hourly;
        this.change = change;
        this.direct = direct;
        this.benefits = benefits;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public double getHourly() {
        return hourly;
    }

    public void setHourly(double hourly) {
        this.hourly = hourly;
    }

    public double getChange() {
        return change;
    }

    public void setChange(double change) {
        this.change = change;
    }

    public double getDirect() {
        return direct;
    }

    public void setDirect(double direct) {
        this.direct = direct;
    }

    public SocialBenefits[] getBenefits() {
        return benefits;
    }

    public void setBenefits(SocialBenefits[] benefits) {
        this.benefits = benefits;
    }
}
