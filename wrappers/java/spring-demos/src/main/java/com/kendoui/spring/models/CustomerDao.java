package com.kendoui.spring.models;

import java.util.List;

public interface CustomerDao {
    public DataSourceResult getList(DataSourceRequest request);
    
    public List<Customer> getList();
}