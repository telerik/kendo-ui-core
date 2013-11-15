package com.kendoui.spring.models;


import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@Entity
@Table(name="Meetings")
public class Meeting {
    private int meetingId;
    private Integer roomId;
    private String title;
    private String description;
    private String recurrenceRule;
    private String recurrenceException;
    private Integer recurrenceId;
    private boolean isAllDay;
    private Date start;
    private Date end;
    private List<Integer> attendees;
    
    @Id
    @Column(name="MeetingID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(int meetingId ) {
        this.meetingId = meetingId ;
    }

    @Column(name="RoomID")
    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
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

    @Transient
    public List<Integer> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Integer> attendees) {
        this.attendees = attendees;
    }

}
