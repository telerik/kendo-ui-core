package com.kendoui.spring.models;

import java.util.List;

public interface EmployeeDao {
    public DataSourceResult getList(DataSourceRequest request);
    
    public List<Employee> getList();
    
    public List<Employee> getListByEmployeeId(Integer employeeId);

    List<DetailedEmployee> getDetailedListByEmployeeId(Integer employeeId);

    List<DetailedEmployee> getDetaliedList();
    
    List<String> getCites();
    
    List<String> getTitles();
}
