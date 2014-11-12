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
public class GanttResourceDaoImpl implements GanttResourceDao {    
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public List<GanttResource> getList() {
        Session session = sessionFactory.getCurrentSession();
        
        Criteria criteria = session.createCriteria(GanttResource.class);
        
        return criteria.list();
    }
}
