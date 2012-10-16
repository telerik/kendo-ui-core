package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class ProductDaoImpl implements ProductDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Product> getList() {
        return sessionFactory.getCurrentSession().createQuery("from Product").list();
    }
    
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Product.class);
        
        return request.toDataSourceResult(criteria);
    }
}