package com.kendoui.spring.models;

import java.util.List;

public interface EmployeeDirectoryDao {
    public DataSourceResult getList(DataSourceRequest request);
    
    public List<EmployeeDirectory> getList();
}