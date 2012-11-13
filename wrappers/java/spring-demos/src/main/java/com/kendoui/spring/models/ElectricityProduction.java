package com.kendoui.spring.models;

public class ElectricityProduction {
    private String country;
    private String year;
    private String unit;
    private int solar;
    private int nuclear;
    private int hydro;
    private int wind;
    
    public ElectricityProduction(String country, String year, String unit, int solar, int hydro, int wind, int nuclear) {
        setCountry(country);
        setYear(year);
        setUnit(unit);
        setHydro(hydro);
        setWind(wind);
        setSolar(solar);
        setNuclear(nuclear);
    }
    
    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
    
    public int getSolar() {
        return solar;
    }

    public void setSolar(int solar) {
        this.solar = solar;
    }
    
    public int getNuclear() {
        return nuclear;
    }

    public void setNuclear(int nuclear) {
        this.nuclear = nuclear;
    }
    
    public int getHydro() {
        return hydro;
    }

    public void setHydro(int hydro) {
        this.hydro = hydro;
    }
    
    public int getWind() {
        return wind;
    }

    public void setWind(int wind) {
        this.wind = wind;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
