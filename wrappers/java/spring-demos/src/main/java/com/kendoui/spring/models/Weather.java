package com.kendoui.spring.models;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@Entity
@Table(name="Weather")
public class Weather {
    private int id;
    private String station;
    private Calendar date;
    private double tmax;
    private double tmin;    
    private double rain;
    private double wind;
    
    public Weather() {
        
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

    @JsonProperty("Station")
    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station;
    }

    @Column(name="Date")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using=IsoCalendarJsonSerializer.class)
    @JsonProperty("Date")
    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) throws Exception {
        this.date = date;
    }

    @JsonProperty("TMax")
    public double getTMax() {
        return tmax;
    }

    public void setTMax(double tmax) {
        this.tmax = tmax;
    }

    @JsonProperty("TMin")
    public double getTMin() {
        return tmin;
    }

    public void setTMin(double tmin) {
        this.tmin = tmin;
    }

    @JsonProperty("Rain")
    public double getRain() {
        return rain;
    }

    public void setRain(double rain) {
        this.rain = rain;
    }

    @JsonProperty("Wind")
    public double getWind() {
        return wind;
    }

    public void setWind(double wind) {
        this.wind = wind;
    }
}
