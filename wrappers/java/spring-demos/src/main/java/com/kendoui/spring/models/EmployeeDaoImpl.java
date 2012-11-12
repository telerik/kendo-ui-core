package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
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
    
    @Override
    public List<DetailedEmployee> getDetailedListByEmployeeId(Integer employeeId) {
        List<DetailedEmployee> result = getDetaliedList();
        
        return result;
    } 
    
    @SuppressWarnings("unchecked")
    @Override
    public List<DetailedEmployee> getDetaliedList() {
        return sessionFactory.getCurrentSession().createCriteria(DetailedEmployee.class)
                .setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
    }
    
//
//    @SuppressWarnings("unchecked")
//    @Override
//    public List<Employee> getListByEmployeeId(Integer employeeId) {
//        if (employeeId == null) {
//            return sessionFactory.getCurrentSession()
//                    .createSQLQuery("select * from Employees where ReportsTo = 2")
//                    .addEntity(Employee.class)
//                    .list();
//        } else {
//            return sessionFactory.getCurrentSession()
//                          .createSQLQuery("select * from Employees where ReportsTo = :employeeId")
//                          .addEntity(Employee.class)
//                          .setParameter("employeeId", employeeId)
//                          .list();
//        }
//    }    
}