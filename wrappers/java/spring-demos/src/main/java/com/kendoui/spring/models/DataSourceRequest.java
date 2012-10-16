package com.kendoui.spring.models;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Junction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.Subqueries;
import org.hibernate.transform.ResultTransformer;
import org.springframework.util.AutoPopulatingList;

public class DataSourceRequest {
    private int page;
    private int pageSize;
    private int take;
    private int skip;
    private List<Map<String, String>> sort;
    private List<Map<String, String>> group;
    
    private Map<String, Object> filter;
    
    public DataSourceRequest() {
        filter = new HashMap<String, Object>();
        
        List<Map<String, Object>> filters = new AutoPopulatingList<Map<String, Object>>(new AutoPopulatingList.ElementFactory<Map<String, Object>>() {
            public Map<String, Object> createElement(int index) {
                Map<String, Object> result = new HashMap<String, Object>();
        
                List<Map<String, Object>> filters = new AutoPopulatingList<Map<String, Object>>(new AutoPopulatingList.ElementFactory<Map<String,Object>>() {
                    public Map<String, Object> createElement(int index) {
                        return new HashMap<String, Object>();
                    }
                });
                
                result.put("filters", filters);
                
                return result; 
            }
        });
        
        filter.put("filters", filters);
    }
    
    public int getPage() {
        return page;
    }
    
    public void setPage(int page) {
        this.page = page;
    }
    
    public int getPageSize() {
        return pageSize;
    }
    
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTake() {
        return take;
    }

    public void setTake(int take) {
        this.take = take;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public List<Map<String, String>> getSort() {
        return sort;
    }

    public void setSort(List<Map<String, String>> sort) {
        this.sort = sort;
    }

    public Map<String, Object> getFilter() {
        return filter;
    }

    public void setFilter(Map<String, Object> filter) {
        this.filter = filter;
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
                if (value instanceof String) {
                    junction.add(Restrictions.ilike(field, value.toString(), MatchMode.EXACT));
                } else {
                    junction.add(Restrictions.eq(field, value));
                }
                break;
            case "neq":
                if (value instanceof String) {
                    junction.add(Restrictions.not(Restrictions.ilike(field, value.toString(), MatchMode.EXACT)));
                } else {
                    junction.add(Restrictions.ne(field, value));
                }
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
    
    private static void sort(Criteria criteria, List<Map<String, String>> sort) {
        if (sort != null && !sort.isEmpty()) {
            for (Map<String, String> entry : sort) {
                String field = entry.get("field");
                String dir = entry.get("dir");
                
                if (dir.equals("asc")) {
                    criteria.addOrder(Order.asc(field));    
                } else if (dir.equals("desc")) {
                    criteria.addOrder(Order.desc(field));
                }
            }
        }
    }
    
    private static void group(final Criteria criteria, List<Map<String, String>> group, final Session session, final Class<?> clazz) {
        if (group != null && !group.isEmpty()) {
            for (Map<String, String> entry : group) {
                final String field = entry.get("field");
                String dir = entry.get("dir");
                
                criteria.setProjection(Projections.groupProperty(field));
                criteria.setResultTransformer(new ResultTransformer() {
                    
                    @Override
                    public Object transformTuple(Object[] value, String[] arg1) {
                        // TODO Auto-generated method stub
                
                        Criteria criteria = session.createCriteria(clazz);
                        Map<String, Object> group = new HashMap<String, Object>();
                        
                        group.put("value", value[0]);
                        group.put("field", field);
                        group.put("hasSubgroups", false);
                        group.put("aggregates", new HashMap<String, Object>());
                        group.put("items", criteria.add(Restrictions.eq(field, value[0])).list());
                        
                        return group;
                    }
                    
                    @Override
                    public List transformList(List arg0) {
                        // TODO Auto-generated method stub
                        return arg0;
                    }
                });
            }
        }
    }

    public DataSourceResult toDataSourceResult(Session session, Class<?> clazz) {
        Criteria criteria = session.createCriteria(clazz);
        
        filter(criteria, getFilter());
        
        long total = (long)criteria.setProjection(Projections.rowCount()).uniqueResult();
        
        
        criteria.setProjection(null);
        criteria.setResultTransformer(Criteria.ROOT_ENTITY);

        group(criteria, getGroup(), session, clazz);
        
        sort(criteria, getSort());
        
        criteria.setMaxResults(getTake());
        criteria.setFirstResult(getSkip());
        
        DataSourceResult result = new DataSourceResult();
        
        result.setTotal(total);
        result.setData(criteria.list());
        
        return result;
    }

    public List<Map<String, String>> getGroup() {
        return group;
    }

    public void setGroup(List<Map<String, String>> group) {
        this.group = group;
    }
}
