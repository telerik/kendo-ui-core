package com.kendoui.spring.models;

import java.util.List;

public interface TaskDao {
    public DataSourceResult getList(DataSourceRequest request);
    
    public void saveOrUpdate(List<Task> tasks);
    
    public void delete(List<Task> tasks);
}
