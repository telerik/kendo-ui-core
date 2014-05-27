package com.kendoui.spring.controllers.grid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Category;
import com.kendoui.spring.models.CategoryDao;
import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

@Controller("grid-foreignkeycolumn-controller")
@RequestMapping(value="/grid/")
public class ForeignKeyColumnController {
    
    @Autowired
    private ProductDao product;
    
    @Autowired 
    private CategoryDao category;
    
    @RequestMapping(value = "/foreignkeycolumn", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("categories", populateCategories());
        
        return "grid/foreignkeycolumn";
    }
    
    @RequestMapping(value = "/foreignkeycolumn/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
    
    @RequestMapping(value = "/foreignkeycolumn/update", method = RequestMethod.POST)
    public @ResponseBody List<Product> update(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            
            product.setProductId((int)model.get("productId"));
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            product.setUnitsInStock((int)model.get("unitsInStock"));
            product.setDiscontinued((boolean)model.get("discontinued"));
            product.setCategoryId((int)model.get("categoryId"));
            
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/foreignkeycolumn/create", method = RequestMethod.POST)
    public @ResponseBody List<Product> create(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            product.setCategoryId((int)model.get("categoryId"));
            
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/foreignkeycolumn/destroy", method = RequestMethod.POST)
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
    
    @SuppressWarnings("serial")
    private List<?> populateCategories() {
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();        
        for (final Category record : category.getList()) {
            result.add(new HashMap<String, Object>() {{
              put("value", record.getCategoryId());
              put("text", record.getCategoryName());
            }});
        }
        return result;
    }    
}

