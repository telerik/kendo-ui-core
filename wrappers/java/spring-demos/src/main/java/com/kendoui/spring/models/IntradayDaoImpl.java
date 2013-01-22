package com.kendoui.spring.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kendoui.spring.models.DataSourceRequest.FilterDescriptor;

@Transactional
@Component
public class IntradayDaoImpl implements IntradayDao {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    private final Calendar MIN_DATE = new GregorianCalendar();
    private final BaseUnit DEFAULT_UNIT = BaseUnit.Months;
    private final int TIME_PER_MINUTE = 1000 * 60;
    private final int TIME_PER_HOUR = 60 * TIME_PER_MINUTE;
    private final int TIME_PER_DAY = 24 * TIME_PER_HOUR;
    private final int DAYS_PER_WEEK = 7;
    private final int DAYS_PER_MONTH = 31;
    private final int TARGET_RESULT_SIZE = 100;
    
    @Autowired
    private SessionFactory sessionFactory;
    
    IntradayDaoImpl() throws ParseException {
        MIN_DATE.setTime(dateFormat.parse("1990-01-01T00:00:00.000Z"));
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Intraday> getList(DataSourceRequest request) {
        Calendar dateFrom = MIN_DATE;
        Calendar dateTo = new GregorianCalendar();
        BaseUnit baseUnit = DEFAULT_UNIT;
        
        if (request != null) {
            List<FilterDescriptor> filters = request.getFilter().getFilters();
            if (filters.size() == 2) {
                try {
                    dateFrom.setTime(dateFormat.parse(filters.get(0).getValue().toString()));
                    dateTo.setTime(dateFormat.parse(filters.get(1).getValue().toString()));
                    baseUnit = getBaseUnit(dateFrom, dateTo);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }
        
        Query query = sessionFactory.getCurrentSession()
                .createQuery(
                        "select new Intraday(" +
                                "year(i.date), " +
                                "month(i.date), " +
                                "day(i.date), " +
                                "hour(i.date), " +
                                "minute(i.date), " +
                                "max(i.open), max(i.high), min(i.low), max(i.close), sum(i.volume))" +
                        "from Intraday i " +
                        "where i.date between :from and :to " +
                        "group by " +
                            "year(i.date)" +
                            // Group only by the date parts that are significant for the specified base unit
                            (BaseUnit.Months.compareTo(baseUnit) <= 0 ? ", month(i.date)" : "") +
                            (BaseUnit.Weeks.compareTo(baseUnit) <= 0 ? ", day(i.date)" : "") +
                            (BaseUnit.Hours.compareTo(baseUnit) <= 0 ? ", hour(i.date)" : "") +
                            (BaseUnit.Minutes.compareTo(baseUnit) <= 0 ? ", minute(i.date)" : "")
                )
                .setParameter("from", dateFrom)
                .setParameter("to", dateTo);

        return query.list();
    }

    private BaseUnit getBaseUnit(Calendar dateFrom, Calendar dateTo)
    {
        long diff = dateTo.getTimeInMillis() - dateFrom.getTimeInMillis();
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