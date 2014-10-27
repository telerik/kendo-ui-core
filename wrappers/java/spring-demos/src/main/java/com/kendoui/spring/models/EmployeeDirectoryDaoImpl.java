package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
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
    
    @SuppressWarnings("unchecked")
    @Override
    public List<DetailedEmployeeDirectory> getByEmployeeId(Integer employeeId) {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DetailedEmployeeDirectory.class);
        
        if (employeeId == null) {
            criteria.add(Restrictions.isNull("reportsTo"));       
        } else {
            criteria.add(Restrictions.eq("reportsTo", employeeId));
        }
        
        return criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
    } 
        
    public void saveOrUpdate(EmployeeDirectory employee) {
        Session session = sessionFactory.getCurrentSession();
        
        session.saveOrUpdate(employee);
    }
    
    public void delete(EmployeeDirectory employee) {
        Session session = sessionFactory.getCurrentSession();
        
        session.delete(session.load(EmployeeDirectory.class, employee.getEmployeeId()));
    }
}