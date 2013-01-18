package com.kendoui.spring.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kendoui.spring.models.DataSourceRequest.FilterDescriptor;

@Transactional
@Component
public class IntradayDaoImpl implements IntradayDao {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    private final Date MIN_DATE = dateFormat.parse("1990/01/01 00:00:00");
    private final BaseUnit DEFAULT_UNIT = BaseUnit.Months;
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
        List<FilterDescriptor> filters = request.getFilter().getFilters();
        if (filters.size() == 2) {
            try {
                dateFrom = dateFormat.parse(filters.get(0).getValue().toString());
                dateTo = dateFormat.parse(filters.get(1).getValue().toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        
        Criteria query = sessionFactory.getCurrentSession().createCriteria(Intraday.class);
                //.add(Restrictions.ge("date", dateFrom))
                //.add(Restrictions.le("date", dateTo));       
        

        return query.list();
    }
}