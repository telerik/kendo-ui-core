package com.kendoui.spring.hibernate;

import org.hibernate.Session;
import org.hibernate.cfg.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.kendoui.spring.models.Product;

public class Northwind {
    /*
    public static final Session createSession() {
        
        RequestContextHolder.getRequestAttributes();
        
        HttpServletRequest context = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
        
                String db = request.getSession().getServletContext().getRealPath("/WEB-INF/northwind.db");
        
        Configuration configuration = new Configuration()
            .addAnnotatedClass(Product.class)
            .setProperty("hibernate.format_sql", "true")
            .setProperty("hibernate.show_sql", "true")
            .setProperty("hibernate.connection.driver_class", "org.sqlite.JDBC")
            .setProperty("hibernate.connection.url", "jdbc:sqlite:" + db)
            .setProperty("hibernate.dialect", "com.kendoui.spring.hibernate.SQLiteDialect");
      
    }
       */
}
