package com.kendoui.spring.models;

import java.util.List;

public interface GanttAssignmentDao {
    public List<GanttAssignment> getList();
    
    public void saveOrUpdate(List<GanttAssignment> assignments);
    
    public void delete(List<GanttAssignment> assignments);
}
