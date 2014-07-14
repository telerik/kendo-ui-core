package com.kendoui.spring.controllers.pivotgrid;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ProductDao;

@Controller("pivotgrid-local-flat-data-binding-controller")
@RequestMapping(value="/pivotgrid/")
public class LocalFlatDataBindingController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/local-flat-data-binding"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        return "pivotgrid/local-flat-data-binding";
    }
    
}

