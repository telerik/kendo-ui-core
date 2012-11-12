package com.kendoui.spring.models;

public class CrimeData{
    private String state;
    private double murder;
    private double burglary;
    private int population;
    
    public CrimeData(String state, double murder, double burglary, int population) {
        setState(state);
        setMurder(murder);
        setBurglary(burglary);
        setPopulation(population);
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getMurder() {
        return murder;
    }

    public void setMurder(double murder) {
        this.murder = murder;
    }

    public double getBurglary() {
        return burglary;
    }

    public void setBurglary(double burglary) {
        this.burglary = burglary;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }
}
