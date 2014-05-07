package com.kendoui.spring.controllers.listview;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ProductDao;

@Controller("listview-home-controller")
@RequestMapping(value="/listview/")
public class IndexController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {        
        model.addAttribute("products", product.getList());
        
        return "listview/index";
    }      
}

