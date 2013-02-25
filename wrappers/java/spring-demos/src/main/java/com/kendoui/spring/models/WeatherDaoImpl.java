package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class WeatherDaoImpl implements WeatherDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Weather> getByMonth(String station, int year, int month) {
        Query query = sessionFactory.getCurrentSession()
                .createQuery(
                        "select w " +
                        "from Weather w " +
                        "where w.station = :station and year(w.date) = :year and month(w.date) = :month"
                )
                .setParameter("station", station)
                .setParameter("year", year)
                .setParameter("month", month);

        return query.list();
    }
}
