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

@Controller("listview-rtl-controller")
@RequestMapping(value="/web/listview/")
public class RtlController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/rtl", method = RequestMethod.GET)
    public String index() {        
        
        return "web/listview/rtl";
    }
    
    @RequestMapping(value = "/rtl_read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
}

