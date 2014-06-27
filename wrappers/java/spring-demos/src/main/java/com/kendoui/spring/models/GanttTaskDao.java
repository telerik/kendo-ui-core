package com.kendoui.spring.models;

import java.util.List;

public interface GanttTaskDao {
    public List<GanttTask> getList();
    
    public void saveOrUpdate(List<GanttTask> tasks);
    
    public void delete(List<GanttTask> tasks);
}
