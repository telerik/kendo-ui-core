package com.kendoui.spring.controllers.combobox;

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

@Controller("combobox-cascadingcombobox-controller")
@RequestMapping(value="/combobox/")
public class CascadingComboBoxController {
    
    @Autowired 
    private CategoryDao category;
    
    @Autowired 
    private ProductDao product;
    
    @Autowired 
    private OrderDao order;
    
    @RequestMapping(value = {"/cascadingcombobox"}, method = RequestMethod.GET)
    public String index() {
        return "combobox/cascadingcombobox";
    }
    
    @RequestMapping(value = "/cascadingcombobox/categories", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult categories(@RequestBody DataSourceRequest request) {
        return category.getList(request);
    }
    
    @RequestMapping(value = "/cascadingcombobox/products", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult products(@RequestBody DataSourceRequest request) {
        return product.getList(request);
    }
    
    @RequestMapping(value = "/cascadingcombobox/orders", method = RequestMethod.POST)
    public @ResponseBody List<?> orders(@RequestBody DataSourceRequest request) {
        List<?> items = order.getListByProductIdAndShipCity(request);
       
        return items;
    }
}