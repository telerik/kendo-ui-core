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
@Table(name="EmployeeDirectory")
public class EmployeeDirectory {
    private Integer employeeId;
    private String firstName;
    private String lastName;
    private Integer reportsTo;
    private String address;
    private String city;
    private String country;
    private String phone;    
    private int extension;    
    private Date birthDate;
    private Date hireDate;    
    private String position;
    
    @Id
    @Column(name="EmployeeID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Integer getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }
    
    @Column(name="FirstName")
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    @Column(name="LastName")
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    @Column(name="ReportsTo", nullable = true)    
    public Integer getReportsTo() {
        return reportsTo;
    }
    
    public void setReportsTo(Integer reportsTo) {
        this.reportsTo = reportsTo;
    }
    
    @Column(name="Address")
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
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
    
    @Column(name="Phone")
    public String getPhone() {
        return phone;
    }
        
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    @Column(name="Extension")
    public int getExtension() {
        return extension;
    }
    
    public void setExtension(int extension) {
        this.extension = extension;
    }
    
    @Column(name="BirthDate")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getBirthDate() {
        return birthDate;
    }
    
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
    
    @Column(name="HireDate")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getHireDate() {
        return hireDate;
    }
    
    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }
    
    @Column(name="Position")
    public String getPosition() {
        return position;
    }
    
    public void setPosition(String position) {
        this.position = position;
    }       
}