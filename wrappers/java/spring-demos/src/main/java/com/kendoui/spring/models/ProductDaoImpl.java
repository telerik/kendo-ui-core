package com.kendoui.spring.models;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Junction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
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
    
    private static void restrict(Junction junction, Map<String, Object> filter) {
        String operator = filter.get("operator").toString();
        String field = filter.get("field").toString();
        Object value = filter.get("value");
        
        try {
            value = Double.parseDouble(value.toString());
        }catch(NumberFormatException nfe) {
        }
        
        switch(operator) {
            case "eq":
                junction.add(Restrictions.eq(field, value));
                break;
            case "neq":
                junction.add(Restrictions.ne(field, value));
                break;
            case "gt":
                junction.add(Restrictions.gt(field, value));
                break;
            case "gte":
                junction.add(Restrictions.ge(field, value));
                break;
            case "lt":
                junction.add(Restrictions.lt(field, value));
                break;
            case "lte":
                junction.add(Restrictions.le(field, value));
                break;
            case "startswith":
                junction.add(Restrictions.ilike(field, value.toString(), MatchMode.START));
                break;
            case "endswith":
                junction.add(Restrictions.ilike(field, value.toString(), MatchMode.END));
                break;
            case "contains":
                junction.add(Restrictions.ilike(field, value.toString(), MatchMode.ANYWHERE));
                break;                
            case "doesnotcontain":
                junction.add(Restrictions.not(Restrictions.ilike(field, value.toString(), MatchMode.ANYWHERE)));
                break;
        }

    }
    
    private static void filter(Criteria criteria, Map<String, Object> filter) {
        List<Map<String, Object>> filters = (List<Map<String, Object>>)filter.get("filters");
        
        if (!filters.isEmpty()) {
            Junction junction = Restrictions.conjunction();
            
            if (filter.get("logic").toString().equals("or")) {
                junction = Restrictions.disjunction();
            }
            
            for(Map<String, Object> entry : filters) {
                if (entry.containsKey("logic")) {
                    filter(criteria, entry);
                } else {
                    restrict(junction, entry);
                }
            }
            
            criteria.add(junction);
        }
    }

    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        DataSourceResult result = new DataSourceResult();
        
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Product.class);
        
        filter(criteria, request.getFilter());
        
        result.setTotal((long)criteria.setProjection(Projections.rowCount()).uniqueResult());
        
        criteria.setProjection(null);
        criteria.setResultTransformer(Criteria.ROOT_ENTITY);
        
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