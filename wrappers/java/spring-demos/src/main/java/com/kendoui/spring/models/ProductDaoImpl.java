package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kendoui.taglib.DataSourceRequest;
import com.kendoui.taglib.DataSourceResult;

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
        DataSourceResult result = new DataSourceResult();
        
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Product.class);
        result.setTotal((long)criteria.setProjection(Projections.rowCount()).uniqueResult());
        
        criteria = sessionFactory.getCurrentSession().createCriteria(Product.class);
        criteria.setMaxResults(request.getTake());
        criteria.setFirstResult(request.getSkip());
        
        result.setData(criteria.list());
        
        return result;
    }
}