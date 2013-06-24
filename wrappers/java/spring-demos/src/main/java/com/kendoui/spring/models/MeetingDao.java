package com.kendoui.spring.models;

import java.util.List;

public interface MeetingDao {
    public List<Meeting> getList();
    
    public void saveOrUpdate(List<Meeting> tasks);
    
    public void delete(List<Meeting> tasks);
}
