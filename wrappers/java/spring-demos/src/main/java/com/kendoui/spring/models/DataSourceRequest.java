package com.kendoui.spring.models;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Junction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
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

    private static void restrict(Junction junction, Map<String, Object> filter, Class<?> clazz) {
        String operator = filter.get("operator").toString();
        String field = filter.get("field").toString();
        Object value = filter.get("value");
        
        try {
            Class<?> type = new PropertyDescriptor(field, clazz).getPropertyType();
            if (type == double.class || type == Double.class) {
                value = Double.parseDouble(value.toString());
            } else if (type == float.class || type == Float.class) {
                value = Float.parseFloat(value.toString());
            } else if (type == long.class || type == Long.class) {
                value = Long.parseLong(value.toString());
            } else if (type == int.class || type == Integer.class) {
                value = Integer.parseInt(value.toString());
            } else if (type == short.class || type == Short.class) {
                value = Short.parseShort(value.toString());
            } else if (type == boolean.class || type == Boolean.class) {
                value = Boolean.parseBoolean(value.toString());
            }
        }catch (IntrospectionException e) {
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
    
    private static void filter(Criteria criteria, Map<String, Object> filter, Class<?> clazz) {
        List<Map<String, Object>> filters = (List<Map<String, Object>>)filter.get("filters");
        
        if (!filters.isEmpty()) {
            Junction junction = Restrictions.conjunction();
            
            if (filter.get("logic").toString().equals("or")) {
                junction = Restrictions.disjunction();
            }
            
            for(Map<String, Object> entry : filters) {
                if (entry.containsKey("logic")) {
                    filter(criteria, entry, clazz);
                } else {
                    restrict(junction, entry, clazz);
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
    
    private static List<?> groupBy(List<?> items, List<Map<String, String>> group, Class<?> clazz)  throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    	ArrayList<Map<String, Object>> result = new ArrayList<Map<String,  Object>>();    	
    	                        
        if (!items.isEmpty() && group != null && !group.isEmpty()) {
        	String field = group.get(0).get("field");
        	
            Method accessor = new PropertyDescriptor(field, clazz).getReadMethod();          		
            
            Object groupValue = accessor.invoke(items.get(0));
                        
            Map<String, Object> groupItem = new HashMap<String, Object>();
            result.add(groupItem);
            
            groupItem.put("value", groupValue);
            groupItem.put("field", field);
            groupItem.put("hasSubgroups", group.size() > 1);
            groupItem.put("aggregates", new HashMap<String, Object>());
                        
            List<Object> groupItems = new ArrayList<Object>();           
            
            groupItem.put("items", groupItems);
            
            for (Object item : items) {            	
            	Object currentValue = accessor.invoke(item);
            	
				if (!groupValue.equals(currentValue)) {
					groupValue = currentValue;
					groupItem = new HashMap<String, Object>();
					result.add(groupItem);
					
					groupItem.put("value", groupValue);
		            groupItem.put("field", field);
		            groupItem.put("hasSubgroups", group.size() > 1);
		            groupItem.put("aggregates", new HashMap<String, Object>());
		                        
		            groupItems = new ArrayList<Object>();
		            groupItem.put("items", groupItems);
				}
				groupItems.add(item);
			}        
            
            if (group.size() > 1) {
            	for (Map<String,Object> g : result) {           		
            		g.put("items", groupBy((List<?>)g.get("items"), group.subList(1, group.size()), clazz));
				}
            }
        }
        
    	return result;
    }
    
    private static List<?>  group(final Criteria criteria, final List<Map<String, String>> group, final Session session, final Class<?> clazz) {
    	List<?> result = new ArrayList<Object>();
    	
        if (group != null && !group.isEmpty()) {
            try {
				result = groupBy(criteria.list(), group, clazz);
			} catch (IllegalAccessException | IllegalArgumentException
					| InvocationTargetException | HibernateException
					| IntrospectionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        return result;
    }

    private static long total(Criteria criteria) {
        long total = (long)criteria.setProjection(Projections.rowCount()).uniqueResult();
        
        criteria.setProjection(null);
        criteria.setResultTransformer(Criteria.ROOT_ENTITY);
        
        return total;
    }
    
    private static void page(Criteria criteria, int take, int skip) {
        criteria.setMaxResults(take);
        criteria.setFirstResult(skip);
    }
    
    public DataSourceResult toDataSourceResult(Session session, Class<?> clazz) {
        Criteria criteria = session.createCriteria(clazz);
        
        filter(criteria, getFilter(), clazz);
        
        long total = total(criteria);
        
        List<Map<String, String>> sort = new ArrayList<Map<String, String>>();
        
        List<Map<String, String>> groups = getGroup();
        List<Map<String, String>> sorts = getSort();
        
        if (groups != null) {
        	sort.addAll(groups);
        }        
        
        if (sorts != null) {
        	sort.addAll(sorts);
        }       
        
        sort(criteria, sort);
    
        page(criteria, getTake(), getSkip());        
        
        DataSourceResult result = new DataSourceResult();
        
        result.setTotal(total);
        
        if (groups != null && !groups.isEmpty()) {        	
			result.setData(group(criteria, groups, session, clazz));									
        } else {
        	result.setData(criteria.list());	
        }
        return result;
    }

    public List<Map<String, String>> getGroup() {
        return group;
    }

    public void setGroup(List<Map<String, String>> group) {
        this.group = group;
    }
}
