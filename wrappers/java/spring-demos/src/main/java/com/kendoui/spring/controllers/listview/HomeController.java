package com.kendoui.spring.controllers.listview;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.ProductDao;

@Controller("listview-home-controller")
@RequestMapping(value="/web/listview/")
public class HomeController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("products", product.getList());
        
        return "web/listview/index";
    }
    
    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult products(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
}

