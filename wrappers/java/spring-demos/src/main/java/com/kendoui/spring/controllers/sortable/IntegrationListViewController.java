package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

import com.kendoui.spring.models.ProductDao;

@Controller("sortable-integration-listview-controller")
@RequestMapping(value="/sortable/")
public class IntegrationListViewController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/", "/integration-listview"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        
        return "sortable/integration-listview";
    }
    
}