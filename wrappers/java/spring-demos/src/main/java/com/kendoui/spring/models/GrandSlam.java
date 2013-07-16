package com.kendoui.spring.models;

public class GrandSlam {
    private int year;
    private int win;
    private int loss;
    private String extremum;
    
    public GrandSlam(int year, int win, int loss, String extremum) {
        setYear(year);
        setWin(win);
        setLoss(loss);
        setExtremum(extremum);
    }
    
    public int getYear() {
        return year;
    }
    
    public void setYear(int year) {
        this.year = year;
    }

    public int getWin() {
        return win;
    }

    public void setWin(int win) {
        this.win = win;
    }

    public int getLoss() {
        return loss;
    }

    public void setLoss(int loss) {
        this.loss = loss;
    }

    public String getExtremum() {
        return extremum;
    }

    public void setExtremum(String extremum) {
        this.extremum = extremum;
    }
}
