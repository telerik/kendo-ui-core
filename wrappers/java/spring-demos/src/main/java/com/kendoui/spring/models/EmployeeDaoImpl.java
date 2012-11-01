package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class EmployeeDaoImpl implements EmployeeDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Employee.class);
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Employee> getList() {
        return sessionFactory.getCurrentSession().createCriteria(Employee.class).list();
    }
}