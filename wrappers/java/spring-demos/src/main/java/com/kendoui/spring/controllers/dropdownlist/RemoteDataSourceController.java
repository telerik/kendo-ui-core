package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.ProductDao;

@Controller("dropdownlist-remotedatasource-controller")
@RequestMapping(value="/dropdownlist/")
public class RemoteDataSourceController {
    @Autowired 
    private ProductDao product;

    @RequestMapping(value = "/remotedatasource", method = RequestMethod.GET)
    public String index() {
        return "dropdownlist/remotedatasource";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return product.getList(request);
    }
}