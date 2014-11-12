package com.kendoui.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GanttResourceAssignments")
public class GanttAssignment {
    private int id;
    private int taskId;
    private int resourceId;
    private double units;
    
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id ) {
        this.id = id ;
    }
    
    @Column(name="TaskID")
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }
    
    @Column(name="ResourceID")
    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }
    
    @Column(name="Units")
    public double getUnits() {
        return units;
    }

    public void setUnits(double units) {
        this.units = units;
    }
}
