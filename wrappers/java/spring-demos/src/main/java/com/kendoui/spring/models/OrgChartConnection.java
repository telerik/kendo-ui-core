package com.kendoui.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="OrgChartConnections")
public class OrgChartConnection {
    private int id;
    private int from;
    private int to;
    private String text;
    
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
        
    @Column(name="From")    
    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    @Column(name="To")    
    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }
    
    @Column(name="Text")   
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
