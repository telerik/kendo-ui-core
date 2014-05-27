package com.kendoui.spring.controllers.dropdownlist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CategoryDao;
import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.OrderDao;
import com.kendoui.spring.models.ProductDao;

@Controller("dropdownlist-cascadingdropdownlist-controller")
@RequestMapping(value="/dropdownlist/")
public class CascadingDropDownListController {
    
    @Autowired 
    private CategoryDao category;
    
    @Autowired 
    private ProductDao product;
    
    @Autowired 
    private OrderDao order;
    
    @RequestMapping(value = {"/cascadingdropdownlist"}, method = RequestMethod.GET)
    public String index() {
        return "dropdownlist/cascadingdropdownlist";
    }
    
    @RequestMapping(value = "/cascadingdropdownlist/categories", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult categories(@RequestBody DataSourceRequest request) {
        return category.getList(request);
    }
    
    @RequestMapping(value = "/cascadingdropdownlist/products", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult products(@RequestBody DataSourceRequest request) {
        return product.getList(request);
    }
    
    @RequestMapping(value = "/cascadingdropdownlist/orders", method = RequestMethod.POST)
    public @ResponseBody List<?> orders(@RequestBody DataSourceRequest request) {
        List<?> items = order.getListByProductId(request);
        
        return items;
    }
}