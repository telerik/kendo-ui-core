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
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.ResultTransformer;
import org.springframework.util.AutoPopulatingList;

public class DataSourceRequest {
    private int page;
    private int pageSize;
    private int take;
    private int skip;
    private List<Map<String, String>> sort;
    private List<GroupDescriptor> group;
    
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
    
    private static List<?> groupBy(List<?> items, List<GroupDescriptor> group, Class<?> clazz, final Session session)  throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    	ArrayList<Map<String, Object>> result = new ArrayList<Map<String,  Object>>();    	
    	                        
        if (!items.isEmpty() && group != null && !group.isEmpty()) {
            GroupDescriptor descriptor = group.get(0);
            List<AggregateDescriptor> aggregates = descriptor.getAggregates();
                    
        	final String field = descriptor.getField();
        	
            Method accessor = new PropertyDescriptor(field, clazz).getReadMethod();          		
            
            Object groupValue = accessor.invoke(items.get(0));
                        
            List<Object> groupItems = createGroupItem(group.size() > 1, clazz, session, result, aggregates, field, groupValue);
            
            for (Object item : items) {            	
            	Object currentValue = accessor.invoke(item);
            	
				if (!groupValue.equals(currentValue)) {
					groupValue = currentValue;
					groupItems = createGroupItem(group.size() > 1, clazz, session, result, aggregates, field, groupValue);
				}
				groupItems.add(item);
			}        
            
            if (group.size() > 1) {
            	for (Map<String,Object> g : result) {           		
            		g.put("items", groupBy((List<?>)g.get("items"), group.subList(1, group.size()), clazz, session));
				}
            }
        }
        
    	return result;
    }

    private static List<Object> createGroupItem(Boolean hasSubgroups, Class<?> clazz, final Session session, ArrayList<Map<String, Object>> result,
            List<AggregateDescriptor> aggregates,
            final String field, Object groupValue) {
        
        Map<String, Object> groupItem = new HashMap<String, Object>();
        List<Object> groupItems = new ArrayList<Object>();
        
        result.add(groupItem);
        
        groupItem.put("value", groupValue);
        groupItem.put("field", field);
        groupItem.put("hasSubgroups", hasSubgroups);
         
        if (aggregates != null && !aggregates.isEmpty()) {            
            groupItem.put("aggregates", session.createCriteria(clazz)
                    .add(Restrictions.eq(field, groupValue))
                    .setProjection(buildAggregatesProjection(aggregates))                    
                    .setResultTransformer(new ResultTransformer() {                                    
                        @Override
                        public Object transformTuple(Object[] value, String[] aliases) {                            
                            Map<String, Object> result = new HashMap<String, Object>();
                            
                            for (int i = 0; i < aliases.length; i++) {                                
                                String alias = aliases[i];
                                Map<String, Object> aggregate;
                                
                                String name = alias.split("_")[0];
                                if (result.containsKey(name)) {
                                    ((Map<String, Object>)result.get(name)).put(alias.split("_")[1], value[i]);
                                } else {
                                    aggregate = new HashMap<String, Object>();                                    
                                    aggregate.put(alias.split("_")[1], value[i]);        
                                    result.put(name, aggregate);
                                }
                            } 
                            
                            return result;
                        }
                        
                        @Override
                        public List transformList(List collection) {
                            return collection;
                        }
                    })
                    .list()
                    .get(0));
        } else {
            groupItem.put("aggregates", new HashMap<String, Object>());
        }
        groupItem.put("items", groupItems);
        return groupItems;
    }    
    
    private static ProjectionList buildAggregatesProjection(List<AggregateDescriptor> aggregates) {
        ProjectionList projections = Projections.projectionList();
        for (AggregateDescriptor aggregate : aggregates) {
            String alias = aggregate.getField() + "_" + aggregate.getAggregate();
            if (aggregate.getAggregate().equals("count")) {                
                projections.add(Projections.count(aggregate.getField()), alias);                
            } else if (aggregate.getAggregate().equals("sum")) {
                projections.add(Projections.sum(aggregate.getField()), alias);                
            } else if (aggregate.getAggregate().equals("average")) {
                projections.add(Projections.avg(aggregate.getField()), alias);                
            } else if (aggregate.getAggregate().equals("min")) {
                projections.add(Projections.min(aggregate.getField()), alias);                
            } else if (aggregate.getAggregate().equals("max")) {
                projections.add(Projections.max(aggregate.getField()), alias);                
            }
        }
        return projections;
    }
    
    private static List<?>  group(final Criteria criteria, final List<GroupDescriptor> group, final Session session, final Class<?> clazz) {
    	List<?> result = new ArrayList<Object>();
    	
        if (group != null && !group.isEmpty()) {
            try {
				result = groupBy(criteria.list(), group, clazz, session);
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
        
        List<GroupDescriptor> groups = getGroup();
        List<Map<String, String>> sorts = getSort();
        
        if (groups != null) {
            appendGroups(sort);
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

    public List<GroupDescriptor> getGroup() {
        return group;
    }

    public void setGroup(List<GroupDescriptor> group) {
        this.group = group;
    }
    
    private void appendGroups(List<Map<String, String>> sorts){
        List<GroupDescriptor> groups = getGroup();
        if (groups != null && !groups.isEmpty()) {        
            for (GroupDescriptor group : groups) {
                Map<String, String> map = new HashMap<String,String>();
                map.put("field", group.getField());
                map.put("dir", group.getDir());
                sorts.add(map);
            }
        }
    }
    
    public static class GroupDescriptor {
        private String field;
        private String dir;
        private List<AggregateDescriptor> aggregates;

        public GroupDescriptor() {
            aggregates = new ArrayList<AggregateDescriptor>();
        }
        
        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getDir() {
            return dir;
        }

        public void setDir(String dir) {
            this.dir = dir;
        }

        public List<AggregateDescriptor> getAggregates() {
            return aggregates;
        }
    }
    
    public static class AggregateDescriptor {
        private String field;
        private String aggregate;
        
        public String getField() {
            return field;
        }
        public void setField(String field) {
            this.field = field;
        }
        
        public String getAggregate() {
            return aggregate;
        }
        
        public void setAggregate(String aggregate) {
            this.aggregate = aggregate;
        }
    }
}
