package com.kendoui.spring.controllers.grid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.EmployeeDao;

@Controller("grid-filter-menu--customization-controller")
@RequestMapping(value="/grid/")
public class FilterMenuCustomizationController {
    @Autowired 
    private EmployeeDao employee;

    @RequestMapping(value = "/filter-menu-customization", method = RequestMethod.GET)
    public String index() {
        return "grid/filter-menu-customization";
    }
    
    @RequestMapping(value = "/filter-menu-customization/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return employee.getList(request);
    }
    
    @RequestMapping(value = "/filter-menu-customization/cities", method = RequestMethod.GET)
    public @ResponseBody List<?> cites() {
        return employee.getCites();
    }
    
    @RequestMapping(value = "/filter-menu-customization/titles", method = RequestMethod.GET)
    public @ResponseBody List<?> titles() {
        return employee.getTitles();
    }
}