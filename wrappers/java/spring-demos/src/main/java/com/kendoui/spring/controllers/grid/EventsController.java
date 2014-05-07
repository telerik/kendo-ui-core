package com.kendoui.spring.controllers.grid;

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

@Controller("grid-events-controller")
@RequestMapping(value="/grid/")
public class EventsController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {        
        return "grid/events";
    }
    
    @RequestMapping(value = "/events/read", method = RequestMethod.GET)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
}

