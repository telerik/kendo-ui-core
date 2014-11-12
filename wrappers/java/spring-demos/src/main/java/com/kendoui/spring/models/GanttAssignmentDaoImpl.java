package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class GanttAssignmentDaoImpl implements GanttAssignmentDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<GanttAssignment> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(GanttAssignment.class);
        
        return criteria.list();
    }

    @Override
    public void saveOrUpdate(List<GanttAssignment> assignments) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttAssignment assignment : assignments) {
            session.saveOrUpdate(assignment);
        }
        
    }

    @Override
    public void delete(List<GanttAssignment> assignments) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttAssignment assignment : assignments) {
            session.delete(session.load(GanttAssignment.class, assignment.getId()));
        }        
    }

}
