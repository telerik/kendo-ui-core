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
public class GanttDependencyDaoImpl implements GanttDependencyDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<GanttDependency> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(GanttDependency.class);
        
        return criteria.list();
    }

    @Override
    public void saveOrUpdate(List<GanttDependency> dependencies) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttDependency dependency : dependencies) {
            session.saveOrUpdate(dependency);
        }
    }

    @Override
    public void delete(List<GanttDependency> dependencies) {
        Session session = sessionFactory.getCurrentSession();
        
        for (GanttDependency dependency : dependencies) {
            session.delete(session.load(GanttDependency.class, dependency.getId()));
        }
    }
}