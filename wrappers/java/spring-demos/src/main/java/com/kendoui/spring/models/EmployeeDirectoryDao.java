package com.kendoui.spring.models;

import java.util.List;

public interface EmployeeDirectoryDao {
    public DataSourceResult getList(DataSourceRequest request);
    
    public List<EmployeeDirectory> getList();
    
    public List<DetailedEmployeeDirectory> getByEmployeeId(Integer employeeId);
    
    public void saveOrUpdate(EmployeeDirectory employee);
    
    public void delete(EmployeeDirectory employee);
}