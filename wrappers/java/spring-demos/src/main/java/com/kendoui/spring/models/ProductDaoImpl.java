package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Session;
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
        return sessionFactory.getCurrentSession().createCriteria(Product.class).list();
    }
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Product.class);
    }
    
    @Override
    public void saveOrUpdate(List<Product> products) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Product product : products) {
            session.saveOrUpdate(product);
        }
    }
    
    @Override
    public void saveOrUpdate(Product product) {
        Session session = sessionFactory.getCurrentSession();
        
        session.saveOrUpdate(product);
    }
    
    @Override
    public void delete(Product product) {
        Session session = sessionFactory.getCurrentSession();
        
        session.delete(session.load(Product.class, product.getProductId()));
    }
    
    @Override
    public void delete(List<Product> products) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Product product : products) {
            session.delete(session.load(Product.class, product.getProductId()));
        }
    }
}