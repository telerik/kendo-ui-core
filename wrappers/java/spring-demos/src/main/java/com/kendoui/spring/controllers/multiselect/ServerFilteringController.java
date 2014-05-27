package com.kendoui.spring.controllers.multiselect;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

@Controller("multiselect-serverfiltering-controller")
@RequestMapping(value="/multiselect/")
public class ServerFilteringController {
    @Autowired 
    private ProductDao product;

    @RequestMapping(value = "/serverfiltering", method = RequestMethod.GET)
    public String index(Model model) {
        ArrayList<Product> array = new ArrayList<Product>();
        
        Product first = new Product();
        first.setProductId(2);
        first.setProductName("Chang"); 
                
        Product second = new Product();
        second.setProductId(7);
        second.setProductName("Uncle Bob's Organic Dried Pears");  
        
        array.add(first);
        array.add(second);
        
        model.addAttribute("value", array);
        return "multiselect/serverfiltering";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return product.getList(request);
    }
}