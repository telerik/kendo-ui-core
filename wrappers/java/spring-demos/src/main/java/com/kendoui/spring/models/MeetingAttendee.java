package com.kendoui.spring.models;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name="MeetingAttendees")
public class MeetingAttendee implements Serializable {
    private int meetingId;
    private int attendeeId;

    @Id
    @Column(name="MeetingID")
    public int getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(int meetingId ) {
        this.meetingId = meetingId ;
    }

    @Id
    @Column(name="AttendeeID")
    public int getAttendeeId() {
        return attendeeId;
    }

    public void setAttendeeId(int attendeeId) {
        this.attendeeId = attendeeId;
    }
}
