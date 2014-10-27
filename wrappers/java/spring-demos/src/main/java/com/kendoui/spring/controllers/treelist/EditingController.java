package com.kendoui.spring.controllers.treelist;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.EmployeeDirectory;
import com.kendoui.spring.models.EmployeeDirectoryDao;


@Controller("treelist-editing-inline-controller")
@RequestMapping(value="/treelist/")
public class EditingController {
    
    @Autowired 
    private EmployeeDirectoryDao employeeDirectory;
    
    @RequestMapping(value = "/editing", method = RequestMethod.GET)
    public String index() {
        return "treelist/editing";
    }
    
    @RequestMapping(value = "/editing/read", method = RequestMethod.POST)
    public @ResponseBody List<EmployeeDirectory> read() {
        return employeeDirectory.getList();
    }
    /*
    @RequestMapping(value = "/editing-inline/update", method = RequestMethod.POST)
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
    
    @RequestMapping(value = "/editing-inline/create", method = RequestMethod.POST)
    public @ResponseBody Product create(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductName((String)model.get("productName"));
        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
        target.setUnitsInStock((int)model.get("unitsInStock"));
        target.setDiscontinued((boolean)model.get("discontinued"));        
        
        product.saveOrUpdate(target);
        
        return target;
    }
    
    @RequestMapping(value = "/editing-inline/destroy", method = RequestMethod.POST)
    public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
        Product target = new Product();
        
        target.setProductId((int)model.get("productId"));
        
        product.delete(target);
        
        return target;
    }  
    */  
}

