package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.EmployeeDao;

@Controller("grid-row-template-controller")
@RequestMapping(value="/grid/")
public class RowTemplateController {
    @Autowired 
    private EmployeeDao employee;
    
    @RequestMapping(value = "/rowtemplate", method = RequestMethod.GET)
    public String index() {                
        return "grid/rowtemplate";
    }
    
    @RequestMapping(value = "/rowtemplate/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return employee.getList(request);
    }
}