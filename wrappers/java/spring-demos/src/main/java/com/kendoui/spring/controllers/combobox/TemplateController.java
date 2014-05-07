package com.kendoui.spring.controllers.combobox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CustomerDao;
import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;

@Controller("combobox-template-controller")
@RequestMapping(value="/combobox/")
public class TemplateController {
    
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/template"}, method = RequestMethod.GET)
    public String index() {
        return "combobox/template";
    }
    
    @RequestMapping(value = "/template/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return customer.getList(request);
    }
}