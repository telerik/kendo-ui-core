package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class UrbanAreaDaoImpl implements UrbanAreaDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
    @Override
    public List<UrbanArea> getList() {
        return sessionFactory.getCurrentSession().createCriteria(UrbanArea.class).list();
    }
}