package com.kendoui.spring.models;

public class StockDataPoint {
    private String date;

    private double close;

    private int volume;
    
    private double open;

    private double high;

    private double low;

    private String symbol;
    
    public StockDataPoint(String date, double open, double high, double low, double close, int volume) {
        setDate(date);
        setOpen(open);
        setHigh(high);
        setLow(low);
        setClose(close);
        setVolume(volume);
    }
    
    public StockDataPoint(String date, double close, int volume, double open, double high, double low, String symbol) {
        setDate(date);
        setOpen(open);
        setHigh(high);
        setLow(low);
        setClose(close);
        setVolume(volume);
        setSymbol(symbol);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getClose() {
        return close;
    }

    public void setClose(double close) {
        this.close = close;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public double getOpen() {
        return open;
    }

    public void setOpen(double open) {
        this.open = open;
    }

    public double getHigh() {
        return high;
    }

    public void setHigh(double high) {
        this.high = high;
    }

    public double getLow() {
        return low;
    }

    public void setLow(double low) {
        this.low = low;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
