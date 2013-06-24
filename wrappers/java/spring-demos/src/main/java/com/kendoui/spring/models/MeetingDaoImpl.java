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
            List<Integer> atendees = new ArrayList<Integer>();
            
            criteria = session.createCriteria(MeetingAtendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAtendee> meetingAtendees = criteria.list(); 
            
            for (MeetingAtendee atendee : meetingAtendees) {
               atendees.add(atendee.getAtendeeId());
            }
            
            meeting.setAtendees(atendees);
        }
        
        return meetings;
    }

    @Override
    public void saveOrUpdate(List<Meeting> meetings) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Meeting meeting : meetings) {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MeetingAtendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAtendee> meetingAtendees = criteria.list();
            
            List<Integer> atendees = meeting.getAtendees();
            
            for (MeetingAtendee atendee : meetingAtendees) {
                if (atendees != null) {
                    if (atendees.contains(atendee.getAtendeeId())) {
                        atendees.remove((Object)atendee.getAtendeeId());
                    } else {
                        session.delete(atendee);
                    }
                }
            }
            
            if (atendees != null) {
                for (int atendeeId : atendees) {
                    
                    MeetingAtendee atendee = new MeetingAtendee();
                    
                    atendee.setAtendeeId(atendeeId);
                    atendee.setMeetingId(meeting.getMeetingId());
                    
                    session.saveOrUpdate(atendee);
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
            
            criteria = sessionFactory.getCurrentSession().createCriteria(MeetingAtendee.class);
            criteria.add(Restrictions.eq("meetingId", meeting.getMeetingId()));
            
            List<MeetingAtendee> meetingAtendees = criteria.list(); 
            
            for (MeetingAtendee atendee : meetingAtendees) {
                session.delete(atendee);
            }

            session.delete(session.load(Meeting.class, meeting.getMeetingId()));
        }
    }
}