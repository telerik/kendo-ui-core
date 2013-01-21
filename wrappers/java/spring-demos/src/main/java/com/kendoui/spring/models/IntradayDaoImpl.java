package com.kendoui.spring.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kendoui.spring.models.DataSourceRequest.FilterDescriptor;

@Transactional
@Component
public class IntradayDaoImpl implements IntradayDao {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    private final Date MIN_DATE = dateFormat.parse("1990-01-01T00:00:00.000Z");
    private final BaseUnit DEFAULT_UNIT = BaseUnit.Months;
    private final int TIME_PER_MINUTE = 1000 * 60;
    private final int TIME_PER_HOUR = 60 * TIME_PER_MINUTE;
    private final int TIME_PER_DAY = 24 * TIME_PER_HOUR;
    private final int DAYS_PER_WEEK = 7;
    private final int DAYS_PER_MONTH = 31;
    private final int TARGET_RESULT_SIZE = 50;
    
    @Autowired
    private SessionFactory sessionFactory;
    
    IntradayDaoImpl() throws ParseException {
    }
    
    @Override
    public List<?> getList(DataSourceRequest request) {
        Date dateFrom = MIN_DATE;
        Date dateTo = new Date();
        BaseUnit baseUnit = DEFAULT_UNIT;
        
        if (request != null) {
            List<FilterDescriptor> filters = request.getFilter().getFilters();
            if (filters.size() == 2) {
                try {
                    dateFrom = dateFormat.parse(filters.get(0).getValue().toString());
                    dateTo = dateFormat.parse(filters.get(1).getValue().toString());
                    baseUnit = getBaseUnit(dateFrom, dateTo);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }

        Query query = sessionFactory.getCurrentSession()
                .createQuery(
                        /*  + '-' + month(i.date) + '-' + day(i.date) */
                        "select new Intraday(max(i.open), max(i.high), min(i.low), max(i.close), sum(i.volume))" +
                        "from Intraday i " +
                        "where i.date between :from and :to " +
                        "group by " +
                        "year(i.date), month(i.date)"
                )
                .setParameter("from", dateFrom)
                .setParameter("to", dateTo);

        return query.list();
    }

    private BaseUnit getBaseUnit(Date dateFrom, Date dateTo)
    {
        long diff = dateTo.getTime() - dateFrom.getTime();
        long minutes = diff / TIME_PER_MINUTE;
        long hours = diff / TIME_PER_HOUR;
        long days = diff / TIME_PER_DAY;
        BaseUnit result = BaseUnit.Years;

        // Try to maintain groups count below TARGET_RESULT_SIZE
        if (minutes < TARGET_RESULT_SIZE)
        {
            result = BaseUnit.Minutes;
        }
        else if (hours < TARGET_RESULT_SIZE)
        {
            result = BaseUnit.Hours;
        }
        else if (days < TARGET_RESULT_SIZE)
        {
            result = BaseUnit.Days;
        }
        else if (days / DAYS_PER_WEEK < TARGET_RESULT_SIZE)
        {
            result = BaseUnit.Weeks;
        }
        else if (days / DAYS_PER_MONTH < TARGET_RESULT_SIZE)
        {
            result = BaseUnit.Months;
        }

        return result;
    }
}