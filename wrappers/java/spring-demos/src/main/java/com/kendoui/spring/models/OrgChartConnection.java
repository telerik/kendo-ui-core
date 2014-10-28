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
    private Integer from;
    private Integer to;
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

    @Column(name="[From]")
    public Integer getFrom() {
        return from;
    }

    public void setFrom(Integer from) {
        this.from = from;
    }

    @Column(name="[To]")
    public Integer getTo() {
        return to;
    }

    public void setTo(Integer to) {
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
