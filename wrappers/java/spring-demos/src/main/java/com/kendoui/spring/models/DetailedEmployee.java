package com.kendoui.spring.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="Employees")
public class DetailedEmployee {    
    @ManyToOne()
    @JoinColumn(name="ReportsTo")
    @JsonIgnore
    public DetailedEmployee getManager() {
        return manager;
    }

    @JsonIgnore
    public void setManager(DetailedEmployee manager) {
        this.manager = manager;
    }
    
    private DetailedEmployee manager;
 
    @OneToMany(mappedBy="manager", fetch=FetchType.EAGER)
    @JsonIgnore    
    public Set<DetailedEmployee> getEmployees() {
        return employees;
    }
    
    @JsonIgnore
    public void setEmployees(Set<DetailedEmployee> employees) {
        this.employees = employees;
    }
    
    @JsonIgnore
    private Set<DetailedEmployee> employees = new HashSet<DetailedEmployee>();

    @Transient
    public Boolean getHasEmployees() {
        return !getEmployees().isEmpty();
    }  
    
    private int employeeId;
    private String firstName;
    private String lastName;
    private String title;
    private String city;
    private String address;
    private String country;
    private Date birthDate;
    private Integer reportsTo;

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
    
    @Column(name="ReportsTo", insertable=false, updatable=false)
    public Integer getReportsTo() {
        return reportsTo;
    }

    public void setReportsTo(Integer reportsTo) {
        this.reportsTo = reportsTo;
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