package com.kendoui.spring.controllers.listview;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

@Controller("listview-navigation-controller")
@RequestMapping(value="/listview/")
public class KeyboardNavigationController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "navigation", method = RequestMethod.GET)
    public String index() {        
        
        return "listview/keyboard-navigation";
    }
    
    @RequestMapping(value = "/keyboard-navigation/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
    
    @RequestMapping(value = "/keyboard-navigation/update", method = RequestMethod.POST)
    public @ResponseBody Product update(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductId((int)model.get("productId"));
        target.setProductName((String)model.get("productName"));
        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
        target.setUnitsInStock((int)model.get("unitsInStock"));
        target.setDiscontinued((boolean)model.get("discontinued"));        
        
        product.saveOrUpdate(target);
        
        return target;
    }
    
    @SuppressWarnings("serial")
    @RequestMapping(value = "/keyboard-navigation/create", method = RequestMethod.POST)
    public @ResponseBody Map<String,Object> create(@RequestBody Map<String, Object> model) {
        final Product target = new Product();
        
        target.setProductName((String)model.get("productName"));
        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
        target.setUnitsInStock((int)model.get("unitsInStock"));
        target.setDiscontinued((boolean)model.get("discontinued"));        
        
        product.saveOrUpdate(target);        
        
        
        return new HashMap<String, Object>() {{
            put("data", target);
        }};      
    }
    
    @RequestMapping(value = "/keyboard-navigation/destroy", method = RequestMethod.POST)
    public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductId((int)model.get("productId"));
        
        product.delete(target);
        
        return target;
    }    
}

