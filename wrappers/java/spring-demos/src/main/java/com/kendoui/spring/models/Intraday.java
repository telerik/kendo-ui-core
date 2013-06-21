package com.kendoui.spring.models;

import java.util.Calendar;
import java.util.GregorianCalendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@Entity
@Table(name="Intraday")
public class Intraday {
    private int id;
    private String symbol;
    private Calendar date;
    private double close;
    private long volume;    
    private double open;
    private double high;
    private double low;
    
    public Intraday() {
        
    }
    
    // Splitting the date in parts allows for easier grouping by the DAO
    public Intraday(int year, int month, int day, int hour, int minute,
            double open, double high, double low, double close, long volume) {
        this.date = new GregorianCalendar(year, month, day, hour, minute);
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }
    
    @Id
    @Column(name="ID")
    @JsonIgnore
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="Date")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using=IsoCalendarJsonSerializer.class)
    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) throws Exception {
        this.date = date;
    }

    @Column(name="Close")
    public double getClose() {
        return close;
    }

    public void setClose(double close) {
        this.close = close;
    }

    @Column(name="Volume")
    public long getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    @Column(name="Open")
    public double getOpen() {
        return open;
    }

    public void setOpen(double open) {
        this.open = open;
    }

    @Column(name="High")
    public double getHigh() {
        return high;
    }

    public void setHigh(double high) {
        this.high = high;
    }

    @Column(name="Low")
    public double getLow() {
        return low;
    }

    public void setLow(double low) {
        this.low = low;
    }

    @Column(name="Symbol")
    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
