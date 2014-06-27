package com.kendoui.spring.models;

import java.util.List;

public interface GanttDependencyDao {
    public List<GanttDependency> getList();
    
    public void saveOrUpdate(List<GanttDependency> tasks);
    
    public void delete(List<GanttDependency> tasks);
}
