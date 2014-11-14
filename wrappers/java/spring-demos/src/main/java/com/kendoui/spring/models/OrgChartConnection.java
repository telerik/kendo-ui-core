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
    private String text;
    private Integer fromShapeId;
    private Integer toShapeId;
    private Integer fromPointX;
    private Integer fromPointY;
    private Integer toPointX;
    private Integer toPointY;

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="Text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
    @Column(name="FromShapeId")
    public Integer getFromShapeId() {
        return fromShapeId;
    }

    public void setFromShapeId(Integer fromShapeId) {
        this.fromShapeId = fromShapeId;
    }

    @Column(name="ToShapeId")
    public Integer getToShapeId() {
        return toShapeId;
    }

    public void setToShapeId(Integer toShapeId) {
        this.toShapeId = toShapeId;
    }

    @Column(name="FromPointX")
    public Integer getFromPointX() {
        return fromPointX;
    }

    public void setFromPointX(Integer fromPointX) {
        this.fromPointX = fromPointX;
    }

    @Column(name="FromPointY")
    public Integer getFromPointY() {
        return fromPointY;
    }

    public void setFromPointY(Integer fromPointY) {
        this.fromPointY = fromPointY;
    }

    @Column(name="ToPointX")
    public Integer getToPointX() {
        return toPointX;
    }

    public void setToPointX(Integer toPointX) {
        this.toPointX = toPointX;
    }

    @Column(name="ToPointY")
    public Integer getToPointY() {
        return toPointY;
    }

    public void setToPointY(Integer toPointY) {
        this.toPointY = toPointY;
    }    
}
