package com.kendoui.spring.models;

import java.util.List;

public interface TaskDao {
    public List<Task> getList();
    
    public void saveOrUpdate(List<Task> tasks);
    
    public void delete(List<Task> tasks);
}
