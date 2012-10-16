package com.kendoui.spring.models;

import java.beans.PropertyDescriptor;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.Type;
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
        
        List<Map<String, Object>> filters = (List<Map<String, Object>>)request.getFilter().get("filters");
        
        if (!filters.isEmpty()) {
            for(Map<String, Object> filter : filters) {
                String operator = filter.get("operator").toString();
                String field = filter.get("field").toString();
                Object value = filter.get("value");
                
                try {
                    value = Double.parseDouble(value.toString());
                }catch(NumberFormatException nfe) {
                    
                }
                
                switch(operator) {
                    case "eq":
                        criteria.add(Restrictions.eq(field, value));
                        break;
                    case "neq":
                        criteria.add(Restrictions.ne(field, value));
                        break;
                }
            }
        }
        
        if (request.getSort() != null && !request.getSort().isEmpty()) {
            for (Map<String, String> sort : request.getSort()) {
                String field = sort.get("field");
                String dir = sort.get("dir");
                
                if (dir.equals("asc")) {
                    criteria.addOrder(Order.asc(field));    
                } else if (dir.equals("desc")) {
                    criteria.addOrder(Order.desc(field));
                }
            }
        }
        
        criteria.setMaxResults(request.getTake());
        criteria.setFirstResult(request.getSkip());
        
        result.setData(criteria.list());
        
        return result;
    }
}