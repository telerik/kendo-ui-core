package com.kendoui.spring.controllers;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
    @Autowired 
    private ProductDao product;
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
        
        model.addAttribute("products", product.getList());
        
        return "home";
    }
    
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public @ResponseBody List<Product> products() {

        return product.getList();
    }
}

