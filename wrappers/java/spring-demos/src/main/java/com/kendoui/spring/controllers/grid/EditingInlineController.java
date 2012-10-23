package com.kendoui.spring.controllers.grid;

import java.util.ArrayList;
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

@Controller("grid-editing-inline-controller")
@RequestMapping(value="/web/grid/")
public class EditingInlineController {
    
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/editing-inline", method = RequestMethod.GET)
    public String index() {
        return "web/grid/editing-inline";
    }
    
    @RequestMapping(value = "/editing-inline/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
    
    @RequestMapping(value = "/editing-inline/update", method = RequestMethod.POST)
    public @ResponseBody List<Product> update(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            
            product.setProductId((int)model.get("productId"));
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            product.setUnitsInStock((int)model.get("unitsInStock"));
            product.setDiscontinued((boolean)model.get("discontinued"));
            
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/editing-inline/create", method = RequestMethod.POST)
    public @ResponseBody List<Product> create(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            product.setUnitsInStock((int)model.get("unitsInStock"));
            product.setDiscontinued((boolean)model.get("discontinued"));
            
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/editing-inline/destroy", method = RequestMethod.POST)
    public @ResponseBody List<Product> destroy(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            
            product.setProductId((int)model.get("productId"));
            
            products.add(product);
        }
        
        product.delete(products);
        
        return products;
    }    
}

