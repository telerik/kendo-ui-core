package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class CustomerDaoImpl implements CustomerDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Customer.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Customer> getList() {
        return sessionFactory.getCurrentSession().createCriteria(Customer.class).list();
    }    
}