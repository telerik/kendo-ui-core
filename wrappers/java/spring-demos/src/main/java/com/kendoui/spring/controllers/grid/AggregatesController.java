package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.ProductDao;

@Controller("grid-aggregates-controller")
@RequestMapping(value="/grid/")
public class AggregatesController {
    @Autowired 
    private ProductDao product;

    @RequestMapping(value = "/aggregates", method = RequestMethod.GET)
    public String index() {
        return "grid/aggregates";
    }
    
    @RequestMapping(value = "/aggregates/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return product.getList(request);
    }
}