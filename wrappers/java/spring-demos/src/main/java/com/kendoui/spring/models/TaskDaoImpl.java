package com.kendoui.spring.models;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class TaskDaoImpl implements TaskDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Task.class);
    }

    @Override
    public void saveOrUpdate(List<Task> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Task task : tasks) {
            session.saveOrUpdate(task);
        }
    }

    @Override
    public void delete(List<Task> tasks) {
        Session session = sessionFactory.getCurrentSession();
        
        for (Task task : tasks) {
            session.delete(session.load(Task.class, task.getTaskId()));
        }
    }
}