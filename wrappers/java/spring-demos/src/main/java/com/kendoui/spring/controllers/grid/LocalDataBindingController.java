package com.kendoui.spring.controllers.grid;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ProductDao;

@Controller("grid-local-data-controller")
@RequestMapping(value="/grid/")
public class LocalDataBindingController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        
        return "grid/local-data-binding";
    }
}