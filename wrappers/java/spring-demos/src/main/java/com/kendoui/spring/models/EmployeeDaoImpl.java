package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
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
        return sessionFactory.getCurrentSession().createCriteria(Employee.class)
                .setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
    }

    @Override
    public List<Employee> getListByEmployeeId(Integer employeeId) {
        List<Employee> result = getList();
        
        return result;
    }  
    
    @SuppressWarnings("unchecked")
    @Override
    public List<DetailedEmployee> getDetailedListByEmployeeId(Integer employeeId) {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DetailedEmployee.class);
        
        if (employeeId == null) {
            criteria.add(Restrictions.isNull("reportsTo"));       
        } else {
            criteria.add(Restrictions.eq("reportsTo", employeeId));
        }
        
        return criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
    } 
    
    @SuppressWarnings("unchecked")
    @Override
    public List<DetailedEmployee> getDetaliedList() {
        return sessionFactory.getCurrentSession().createCriteria(DetailedEmployee.class)
                .setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<String> getCites() {        
        return sessionFactory.getCurrentSession().createCriteria(Employee.class)
                .setProjection(Projections.distinct(Projections.property("city"))).list();
    }
    
    @SuppressWarnings("unchecked")
    @Override    
    public List<String> getTitles() {
        return sessionFactory.getCurrentSession().createCriteria(Employee.class)
                .setProjection(Projections.distinct(Projections.property("title"))).list();
    }
}