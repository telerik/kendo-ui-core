package com.kendoui.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="UrbanAreas")
public class UrbanArea {
    private int id;
    private String city;
    private String country;
    private double latitude;
    private double longitude;
    private int pop2010;
    
    @Transient
    private double[] location;
    
    @Id
    @Column(name="ID")
    @JsonIgnore
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="City")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name="Country")
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Column(name="Latitude")
    @JsonIgnore
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    @Column(name="Longitude")
    @JsonIgnore
    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Column(name="Pop2010")
    public int getPop2010() {
        return pop2010;
    }

    public void setPop2010(int pop2010) {
        this.pop2010 = pop2010;
    }
    
    @Transient
    public double[] getLocation() {
        return new double[] { this.getLatitude(), this.getLongitude() };
    }
}