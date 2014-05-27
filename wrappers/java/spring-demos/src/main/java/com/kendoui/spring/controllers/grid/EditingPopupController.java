package com.kendoui.spring.controllers.grid;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

@Controller("grid-editing-popup-controller")
@RequestMapping(value="/grid/")
public class EditingPopupController {
    
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/editing-popup", method = RequestMethod.GET)
    public String index() {
        return "grid/editing-popup";
    }
    
    @RequestMapping(value = "/editing-popup/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
    
    @RequestMapping(value = "/editing-popup/update", method = RequestMethod.POST)
    public @ResponseBody Product update(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductId((int)model.get("productId"));
        target.setProductName((String)model.get("productName"));
        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
        target.setUnitsInStock((int)model.get("unitsInStock"));
        target.setDiscontinued((boolean)model.get("discontinued"));
        target.setCategoryId((int)model.get("categoryId"));
        
        product.saveOrUpdate(target);
        
        return target;
    }
    
    @RequestMapping(value = "/editing-popup/create", method = RequestMethod.POST)
    public @ResponseBody Product create(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductName((String)model.get("productName"));
        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
        target.setUnitsInStock((int)model.get("unitsInStock"));
        target.setDiscontinued((boolean)model.get("discontinued"));        
        
        product.saveOrUpdate(target);
        
        return target;
    }
    
    @RequestMapping(value = "/editing-popup/destroy", method = RequestMethod.POST)
    public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductId((int)model.get("productId"));
        
        product.delete(target);
        
        return target;
    }    
}

