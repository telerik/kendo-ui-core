package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class OrgChartConnectionDaoImpl implements OrgChartConnectionDao {
    @Autowired
    private SessionFactory sessionFactory;

    @SuppressWarnings("unchecked")
    @Override
    public List<OrgChartConnection> getList() {
        return sessionFactory.getCurrentSession().createCriteria(OrgChartConnection.class).list();
    }

    @Override
    public void saveOrUpdate(OrgChartConnection connection) {
        Session session = sessionFactory.getCurrentSession();

        session.saveOrUpdate(connection);
    }

    @Override
    public void delete(OrgChartConnection connection) {
        Session session = sessionFactory.getCurrentSession();

        session.delete(session.load(OrgChartConnection.class, connection.getId()));
    }

}
