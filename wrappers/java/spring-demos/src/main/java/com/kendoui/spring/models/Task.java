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
@Table(name="Tasks")
public class Task {
    private int taskId;
    private Integer ownerId;
    private String title;
    private String description;
    private String recurrenceRule;
    private String recurrenceException;
    private Integer recurrenceId;
    private boolean isAllDay;
    private Date start;
    private Date end;
    
    @Id
    @Column(name="TaskID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId ) {
        this.taskId = taskId ;
    }

    @Column(name="OwnerID")
    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
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

    @Column(name="Description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name="RecurrenceRule")
    public String getRecurrenceRule() {
        return recurrenceRule;
    }

    public void setRecurrenceRule(String recurrenceRule) {
        this.recurrenceRule = recurrenceRule;
    }

    @Column(name="IsAllDay")
    public boolean getIsAllDay() {
        return isAllDay;
    }

    public void setIsAllDay(boolean isAllDay) {
        this.isAllDay = isAllDay;
    }

    @Column(name="RecurrenceException")
    public String getRecurrenceException() {
        return recurrenceException;
    }

    public void setRecurrenceException(String recurrenceException) {
        this.recurrenceException = recurrenceException;
    }

    @Column(name="RecurrenceID")
    public Integer getRecurrenceId() {
        return recurrenceId;
    }

    public void setRecurrenceId(Integer recurrenceId) {
        this.recurrenceId = recurrenceId;
    }

}
