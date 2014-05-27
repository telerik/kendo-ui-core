package com.kendoui.spring.controllers.listview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.ProductDao;

@Controller("listview-remote-data-controller")
@RequestMapping(value="/listview/")
public class RemoteDataBindingController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "remote-data", method = RequestMethod.GET)
    public String index() {        
        
        return "listview/remote-data-binding";
    }
    
    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult products(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
}

