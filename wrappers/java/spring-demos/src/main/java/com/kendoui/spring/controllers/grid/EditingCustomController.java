package com.kendoui.spring.controllers.grid;

import java.util.ArrayList;
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

@Controller("grid-editing-custom-controller")
@RequestMapping(value="/grid/")
public class EditingCustomController {
    
    @Autowired
    private ProductDao product;
    
    @Autowired 
    private CategoryDao category;
    
    @RequestMapping(value = "/editing-custom", method = RequestMethod.GET)
    public String index(Model model) {
        Category defaultCategory = category.getList().get(0);
        model.addAttribute("defaultCategory", defaultCategory);
        return "grid/editing-custom";
    }
    
    @RequestMapping(value = "/editing-custom/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/editing-custom/update", method = RequestMethod.POST)
    public @ResponseBody List<Product> update(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();        
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            final Map<String, Object> categoryMap = (Map<String, Object>)model.get("category");
            
            Category category = new Category() {{
                setCategoryId((int) categoryMap.get("categoryId"));
                setCategoryName((String) categoryMap.get("categoryName"));
            }};          
            
            product.setProductId((int)model.get("productId"));
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            product.setUnitsInStock((int)model.get("unitsInStock"));
            product.setDiscontinued((boolean)model.get("discontinued"));
            product.setCategoryId(category.getCategoryId());
            product.setCategory(category);
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/editing-custom/create", method = RequestMethod.POST)
    public @ResponseBody List<Product> create(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Product> products = new ArrayList<Product>();
        
        for (Map<String, Object> model : models) {
            Product product = new Product();
            final Map<String, Object> categoryMap = (Map<String, Object>)model.get("category");
            
            Category category = new Category(); 
            category.setCategoryId((int) categoryMap.get("categoryId"));
            category.setCategoryName((String) categoryMap.get("categoryName"));
            
            product.setCategoryId(category.getCategoryId());
            product.setCategory(category);
            
            product.setProductName((String)model.get("productName"));
            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
    
            products.add(product);
        }
        
        product.saveOrUpdate(products);
        
        return products;
    }
    
    @RequestMapping(value = "/editing-custom/destroy", method = RequestMethod.POST)
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
    
    @RequestMapping(value = "/editing-custom/categories", method = RequestMethod.GET)
    public @ResponseBody List<Category> categories() {
        return category.getList();
    }   
        
}

