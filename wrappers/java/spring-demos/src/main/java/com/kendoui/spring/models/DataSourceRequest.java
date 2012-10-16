package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class DataSourceRequest {
    private int page;
    private int pageSize;
    private int take;
    private int skip;
    
    public class Sort {
        
    }
    
    private List<Sort> sort;
    private Map<String, Object> filter;
    
    public DataSourceRequest() {
        filter = new HashMap<String, Object>();
        filter.put("filters", new ArrayList<Map<String, Object>>(1));
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

    public List<Sort> getSort() {
        return sort;
    }

    public void setSort(List<Sort> sort) {
        this.sort = sort;
    }

    public Map<String, Object> getFilter() {
        return filter;
    }

    public void setFilter(Map<String, Object> filter) {
        this.filter = filter;
    }

}
