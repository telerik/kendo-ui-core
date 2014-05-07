package com.kendoui.spring.controllers.grid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Customer;
import com.kendoui.spring.models.CustomerDao;


@Controller("grid-home-controller")
@RequestMapping(value="/grid/")
public class IndexController {
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "grid/index";
    }
    
    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public @ResponseBody List<Customer> customers() {

        return customer.getList();
    }
}

