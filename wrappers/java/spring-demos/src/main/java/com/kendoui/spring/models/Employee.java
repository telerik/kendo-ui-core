package com.kendoui.spring.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="Employees")
public class Employee {
    private int employeeId;
    private String firstName;
    private String lastName;
    private String title;
    private String city;
    private String address;
    private String country;
    private Date birthDate;

    @Id
    @Column(name="EmployeeID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
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
    
    @Transient
    public String getFullName() {
        return firstName + " " + lastName;
    }

    @ManyToOne(cascade={CascadeType.ALL}, optional=true)
    @JoinColumn(name="ReportsTo")
    private Employee manager;
 
    @OneToMany(mappedBy="manager")
    private Set<Employee> employees = new HashSet<Employee>();

    @Transient
    public Boolean getHasEmployees() {
        return !employees.isEmpty();
    }

    @Column(name="Title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name="City")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name="Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    @Column(name="Country")
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    
    @Column(name="BirthDate")
    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }       
}