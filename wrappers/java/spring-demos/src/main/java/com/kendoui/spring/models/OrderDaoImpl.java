package com.kendoui.spring.models;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kendoui.spring.models.DataSourceRequest.FilterDescriptor;

@Transactional
@Component
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    
    @Override
    public DataSourceResult getList(DataSourceRequest request) {
        return request.toDataSourceResult(sessionFactory.getCurrentSession(), Order.class);
    }

    @Override
    public List<?> getListByProductId(DataSourceRequest request) {
        FilterDescriptor filter = request.getFilter().getFilters().get(0);        
        
        return sessionFactory.getCurrentSession()
                      .createSQLQuery("select o.* from [ORDER DETAILS] od join ORDERS o on o.OrderID = od.OrderID where ProductID = :productId")
                      .addEntity(Order.class)
                      .setParameter(filter.getField(), filter.getValue())
                      .list();
    }    
    
    @Override
    public List<?> getListByProductIdAndShipCity(DataSourceRequest request) {
        List<FilterDescriptor> filters = request.getFilter().getFilters();
        String query =  "select o.* from [ORDER DETAILS] od join ORDERS o on o.OrderID = od.OrderID where ProductID = :productId";
        FilterDescriptor filterProductID = request.getFilter().getFilters().get(0);
        
        if(filters.size() > 1){
            query += " and ShipCity like :shipCity";
        }
        
        Query sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query)
                .addEntity(Order.class)
                .setParameter(filterProductID.getField(), filterProductID.getValue());
      
       if(filters.size() > 1){
           FilterDescriptor filterShipCity = request.getFilter().getFilters().get(1);
           sqlQuery.setParameter(filterShipCity.getField(), "%" + filterShipCity.getValue() + "%");
       }
          
        return  sqlQuery.list();
                                                    
    }  
}