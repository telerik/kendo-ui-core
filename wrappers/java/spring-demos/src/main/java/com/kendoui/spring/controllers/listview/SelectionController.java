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

@Controller("listview-selection-controller")
@RequestMapping(value="/listview/")
public class SelectionController {
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/selection", method = RequestMethod.GET)
    public String index() {        
        
        return "listview/selection";
    }
    
    @RequestMapping(value = "/selection_read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
}

