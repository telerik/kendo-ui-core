package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class EmployeeDirectoryDaoImpl implements EmployeeDirectoryDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
    @Override
    public List<EmployeeDirectory> getList() {
        return sessionFactory.getCurrentSession().createCriteria(EmployeeDirectory.class).list();
    }
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Product.class);
    }
}