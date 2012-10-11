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

/**
 * Handles requests for the application home page.
 */
@Controller("grid-home-controller")
@RequestMapping(value="/web/grid/")
public class HomeController {
    @Autowired 
    private ProductDao product;
    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String home(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        
        return "web/grid/home";
    }
    
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public @ResponseBody List<Product> products() {

        return product.getList();
    }
}

