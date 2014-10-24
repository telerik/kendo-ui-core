package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CustomerDao;
import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;

@Controller("grid-multicolumnheader-controller")
@RequestMapping(value="/grid/")
public class MulticolumnheadersController {
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/multicolumnheaders"}, method = RequestMethod.GET)
    public String index() {
        return "grid/multicolumnheaders";
    }
    
    @RequestMapping(value = "/multicolumnheaders/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return customer.getList(request);
    }
}