package com.kendoui.spring.controllers;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
//import org.hibernate.service.ServiceRegistry;
//import org.hibernate.service.ServiceRegistryBuilder;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.Product;


/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
    @Autowired 
    private HttpServletRequest request;
    
    @Autowired 
    private SessionFactory factory;
    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Locale locale, Model model) {
        Date date = new Date();
        //DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

        //String formattedDate = dateFormat.format(date);

        model.addAttribute("serverTime", date );

        model.addAttribute("dates", new Date[] { new Date() });
        
        
        //ServiceRegistry registry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
        //SessionFactory factory = configuration.buildSessionFactory(registry);
        
        //SessionFactory factory = configuration.buildSessionFactory();
        
        Session session = factory.openSession();
        
        List products = session.createQuery("from Product").list();
        
        model.addAttribute("products", products);
        
        session.close();
        
        return "home";
    }
}

