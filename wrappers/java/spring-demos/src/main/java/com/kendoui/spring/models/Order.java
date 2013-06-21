package com.kendoui.spring.models;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@Entity
@Table(name="Orders")
public class Order {
    private int orderId;
    private String customerId;
    private int employeeId;
    private String shipName;
    private String shipCity;
    private double freight;
    private Date orderDate;
    private Date shippedDate;
    private String shipAddress;
    private String shipCountry;
    
    @Id
    @Column(name="OrderID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Column(name="CustomerID")
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    
    @Column(name="Freight")
    public double getFreight() {
        return freight;
    }

    public void setFreight(double freight) {
        this.freight = freight;
    }
    
    @Column(name="OrderDate")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
    
    @Column(name="ShippedDate")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getShippedDate() {
        return shippedDate;
    }

    public void setShippedDate(Date shippedDate) {
        this.shippedDate = shippedDate;
    }
    
    @Column(name="EmployeeID")
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }
    
    @Column(name="ShipName")
    public String getShipName() {
        return shipName;
    }

    public void setShipName(String shipName) {
        this.shipName = shipName;
    }

    @Column(name="ShipCity")
    public String getShipCity() {
        return shipCity;
    }

    public void setShipCity(String shipCity) {
        this.shipCity = shipCity;
    }
	
    @Column(name="ShipCountry")
    public String getShipCountry() {
        return shipCountry;
    }

    public void setShipCountry(String shipCountry) {
        this.shipCountry = shipCountry;
    }
    
    @Column(name="ShipAddress")
    public String getShipAddress() {
        return shipAddress;
    }

    public void setShipAddress(String shipAddress) {
        this.shipAddress = shipAddress;
    }
}
