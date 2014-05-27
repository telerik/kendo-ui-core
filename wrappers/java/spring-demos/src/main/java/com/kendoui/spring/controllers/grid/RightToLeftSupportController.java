package com.kendoui.spring.controllers.grid;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ProductDao;

@Controller("grid-rtl-controller")
@RequestMapping(value="/grid/")
public class RightToLeftSupportController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/right-to-left-support", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        
        return "grid/right-to-left-support";
    }
}