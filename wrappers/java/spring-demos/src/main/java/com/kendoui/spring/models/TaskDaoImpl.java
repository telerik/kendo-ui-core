package com.kendoui.spring.models;


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
public class TaskDaoImpl implements TaskDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<Task> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(Task.class);
        
        return criteria.list();
    }

    @Override
    public void saveOrUpdate(List<Task> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Task task : tasks) {
            session.saveOrUpdate(task);
        }
    }

    @Override
    public void delete(List<Task> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Task task : tasks) {
            
            Criteria criteria = session.createCriteria(Task.class);
            criteria.add(Restrictions.eq("recurrenceId", task.getTaskId()));
            
            List<Task> recurrenceExceptions = criteria.list();
            
            for (Task recurrenceException : recurrenceExceptions) {
                session.delete(recurrenceException);
            }
            
            session.delete(session.load(Task.class, task.getTaskId()));
        }
    }
}