package com.kendoui.spring.models;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name="MeetingAtendees")
public class MeetingAtendee implements Serializable {
    private int meetingId;
    private int atendeeId;

    @Id
    @Column(name="MeetingID")
    public int getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(int meetingId ) {
        this.meetingId = meetingId ;
    }

    @Id
    @Column(name="AtendeeID")
    public int getAtendeeId() {
        return atendeeId;
    }

    public void setAtendeeId(int atendeeId) {
        this.atendeeId = atendeeId;
    }
}
