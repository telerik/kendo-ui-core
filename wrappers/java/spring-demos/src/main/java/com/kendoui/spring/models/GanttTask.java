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
@Table(name="GanttTasks")
public class GanttTask {
    private int id;
    private int orderId;
    private Integer parentId;
    private Date start;
    private Date end;
    private String title;
    private boolean summary;
    private boolean expanded;
    private double percentComplete;
    
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id ) {
        this.id = id ;
    }

    @Column(name="OrderID")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Column(name="ParentID", nullable = true)
    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
    
    @Column(name="Start")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }
    
    @Column(name="End")
    @JsonSerialize(using=IsoDateJsonSerializer.class)
    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }
    
    @Column(name="Title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name="Summary")
    public boolean getSummary() {
        return summary;
    }

    public void setSummary(boolean summary) {
        this.summary = summary;
    }

    @Column(name="Expanded")
    public boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    @Column(name="PercentComplete")
    public double getPercentComplete() {
        return percentComplete;
    }

    public void setPercentComplete(double percentComplete) {
        this.percentComplete = percentComplete;
    }
}
