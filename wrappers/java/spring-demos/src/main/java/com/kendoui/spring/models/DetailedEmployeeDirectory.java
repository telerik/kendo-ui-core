package com.kendoui.spring.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Table(name="EmployeeDirectory")
public class DetailedEmployeeDirectory {
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
    
    @Column(name="ReportsTo", nullable = true, insertable=false, updatable=false)    
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
    public Date getBirthDate() {
        return birthDate;
    }
    
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
    
    @Column(name="HireDate")
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
    
    @ManyToOne()
    @JoinColumn(name="ReportsTo")
    @JsonIgnore
    public DetailedEmployeeDirectory getManager() {
        return manager;
    }

    @JsonIgnore
    public void setManager(DetailedEmployeeDirectory manager) {
        this.manager = manager;
    }
    
    private DetailedEmployeeDirectory manager;
 
    @OneToMany(mappedBy="manager", fetch=FetchType.EAGER)
    @JsonIgnore    
    public Set<DetailedEmployeeDirectory> getEmployees() {
        return employees;
    }
    
    @JsonIgnore
    public void setEmployees(Set<DetailedEmployeeDirectory> employees) {
        this.employees = employees;
    }
    
    @JsonIgnore
    private Set<DetailedEmployeeDirectory> employees = new HashSet<DetailedEmployeeDirectory>();

    @Transient
    public Boolean getHasEmployees() {
        return !getEmployees().isEmpty();
    }
}