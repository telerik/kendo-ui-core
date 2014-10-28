package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class OrgChartShapeDaoImpl implements OrgChartShapeDao {
    @Autowired
    private SessionFactory sessionFactory;

    @SuppressWarnings("unchecked")
    @Override
    public List<OrgChartShape> getList() {
        return sessionFactory.getCurrentSession().createCriteria(OrgChartShape.class).list();
    }

    @Override
    public void saveOrUpdate(OrgChartShape shape) {
        Session session = sessionFactory.getCurrentSession();

        session.saveOrUpdate(shape);
    }

    @Override
    public void delete(OrgChartShape shape) {
        Session session = sessionFactory.getCurrentSession();

        session.delete(session.load(OrgChartShape.class, shape.getId()));
    }

}
