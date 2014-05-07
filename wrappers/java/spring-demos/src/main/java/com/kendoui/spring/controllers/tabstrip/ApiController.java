package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tabstrip-api-controller")
@RequestMapping(value="/tabstrip/")
public class ApiController {
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {       
        return "tabstrip/api";
    }    
}