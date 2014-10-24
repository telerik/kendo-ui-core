package com.kendoui.spring.controllers.treeview;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DetailedEmployee;
import com.kendoui.spring.models.EmployeeDao;

@Controller("treeview-remote-binding-controller")
@RequestMapping(value="/treeview/")
public class RemoteBindingController {
    @Autowired 
    private EmployeeDao employee;

    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "treeview/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<DetailedEmployee> read(@RequestBody Map<String, Object> model) {
        return employee.getDetailedListByEmployeeId((Integer)model.get("employeeId"));
    }
}