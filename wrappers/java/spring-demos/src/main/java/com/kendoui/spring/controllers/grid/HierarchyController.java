package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceRequest.FilterDescriptor;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.EmployeeDao;
import com.kendoui.spring.models.OrderDao;

@Controller("grid-hierarchy-controller")
@RequestMapping(value="/grid/")
public class HierarchyController {
    @Autowired 
    private EmployeeDao employee;
    
    @Autowired 
    private OrderDao order;
    
    @RequestMapping(value = "/hierarchy", method = RequestMethod.GET)
    public String index() {
        return "grid/hierarchy";
    }
    
    @RequestMapping(value = "/employees", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult employees(@RequestBody DataSourceRequest request) {
        return employee.getList(request);
    }
    
    @RequestMapping(value = "/orders", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult orders(@RequestBody DataSourceRequest request) {        
        FilterDescriptor filter = new FilterDescriptor();
        filter.setField("employeeId");
        filter.setOperator("eq");
        filter.setValue(request.getData().get("employeeId"));        
        
        FilterDescriptor outer = new FilterDescriptor();
        outer.setLogic("and");        
        outer.getFilters().add(filter);
        
        request.setFilter(outer);
        
        return order.getList(request);        
    }      
}
