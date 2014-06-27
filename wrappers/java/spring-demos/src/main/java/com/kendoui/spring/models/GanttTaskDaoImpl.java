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
public class GanttTaskDaoImpl implements GanttTaskDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<GanttTask> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(GanttTask.class);
        
        return criteria.list();
    }

    @Override
    public void saveOrUpdate(List<GanttTask> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttTask task : tasks) {
            session.saveOrUpdate(task);
        }
    }

    @Override
    public void delete(List<GanttTask> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttTask task : tasks) {
            session.delete(session.load(GanttTask.class, task.getId()));
        }
    }
}