package com.kendoui.spring.models;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class MeetingDaoImpl implements MeetingDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<Meeting> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(Meeting.class);
        
        List <Meeting> meetings = criteria.list();

        for (Meeting meeting : meetings) {
            List<Integer> attendees = new ArrayList<Integer>();
            
            criteria = session.createCriteria(MeetingAttendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAttendee> meetingAttendees = criteria.list(); 
            
            for (MeetingAttendee attendee : meetingAttendees) {
               attendees.add(attendee.getAttendeeId());
            }
            
            meeting.setAttendees(attendees);
        }
        
        return meetings;
    }

    @Override
    public void saveOrUpdate(List<Meeting> meetings) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Meeting meeting : meetings) {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MeetingAttendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAttendee> meetingAttendees = criteria.list();
            
            List<Integer> attendees = meeting.getAttendees();
            
            for (MeetingAttendee attendee : meetingAttendees) {
                if (attendees != null) {
                    if (attendees.contains(attendee.getAttendeeId())) {
                        attendees.remove((Object)attendee.getAttendeeId());
                    } else {
                        session.delete(attendee);
                    }
                }
            }
            
            if (attendees != null) {
                for (int attendeeId : attendees) {
                    
                    MeetingAttendee attendee = new MeetingAttendee();
                    
                    attendee.setAttendeeId(attendeeId);
                    attendee.setMeetingId(meeting.getMeetingId());
                    
                    session.saveOrUpdate(attendee);
                }
            }

            session.saveOrUpdate(meeting);
        }
    }

    @Override
    public void delete(List<Meeting> meetings) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Meeting meeting : meetings) {
            
            Criteria criteria = session.createCriteria(Meeting.class);
            criteria.add(Restrictions.eq("recurrenceId", meeting.getMeetingId()));
            
            List<Meeting> recurrenceExceptions = criteria.list();
            
            for (Meeting recurrenceException : recurrenceExceptions) {
                session.delete(recurrenceException);
            }
            
            criteria = sessionFactory.getCurrentSession().createCriteria(MeetingAttendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAttendee> meetingAttendees = criteria.list(); 
            
            for (MeetingAttendee attendee : meetingAttendees) {
                session.delete(attendee);
            }

            session.delete(session.load(Meeting.class, meeting.getMeetingId()));
        }
    }
}