package com.kendoui.spring.controllers.scheduler;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.Meeting;
import com.kendoui.spring.models.Projection;
import com.kendoui.spring.models.Task;


@Controller("scheduler-restriction-controller")
@RequestMapping(value="/scheduler/")
public class RestrictionController {
    
    @SuppressWarnings("serial")
    @RequestMapping(value = "/restriction", method = RequestMethod.GET)
    public String restriction(Locale locale, Model model) throws ParseException {
        List<Meeting> meetings = new ArrayList<Meeting>();
        
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        
        Meeting meeting = new Meeting();        
        
        meeting.setMeetingId(1);
        meeting.setTitle("Call Charlie about the project");
        meeting.setStart(format.parse("2013/6/13 10:30"));
        meeting.setEnd(format.parse("2013/6/13 11:30"));
        meeting.setRoomId(1);
        meeting.setAttendees(new ArrayList<Integer>() {{ add(1); }});
        
        meetings.add(meeting);
        
        
        meeting = new Meeting();        
        
        meeting.setMeetingId(2);
        meeting.setTitle("Performance review");
        meeting.setStart(format.parse("2013/6/13 9:00"));
        meeting.setEnd(format.parse("2013/6/13 12:30"));
        meeting.setRoomId(2);
        meeting.setAttendees(new ArrayList<Integer>() {{ add(2); }});
        
        meetings.add(meeting);
        
        meeting = new Meeting();        

        meeting.setMeetingId(3);
        meeting.setTitle("HR Lecture");
        meeting.setStart(format.parse("2013/6/13 13:00"));
        meeting.setEnd(format.parse("2013/6/13 14:30"));
        meeting.setRoomId(1);
        meeting.setAttendees(new ArrayList<Integer>() {{ add(2); }});
        
        meetings.add(meeting);
        model.addAttribute("meetings", meetings);
        
        return "scheduler/restriction";
    }
}