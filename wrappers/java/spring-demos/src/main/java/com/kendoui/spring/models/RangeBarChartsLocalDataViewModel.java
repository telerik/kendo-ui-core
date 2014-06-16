package com.kendoui.spring.models;

public class RangeBarChartsLocalDataViewModel {
    public RangeBarChartsLocalDataViewModel(int fa, int ta, int fb, int tb, String day) {
       this.FromA = fa;
       this.ToA = ta;
       this.FromB = fb;
       this.ToB = tb;
       this.Day = day;
    }

    private int FromA;
    private int ToA;
    private int FromB;
    private int ToB;
    private String Day;

    public int getFromA() {
        return FromA;
    }

    public void setFromA(int fromA) {
        FromA = fromA;
    }

    public int getToA() {
        return ToA;
    }

    public void setToA(int toA) {
        ToA = toA;
    }

    public int getToB() {
        return ToB;
    }

    public void setToB(int toB) {
        ToB = toB;
    }

    public int getFromB() {
        return FromB;
    }

    public void setFromB(int fromB) {
        FromB = fromB;
    }

    public String getDay() {
        return Day;
    }

    public void setDay(String day) {
        Day = day;
    }
}
