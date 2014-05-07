package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-api-controller")
@RequestMapping(value="/panelbar/")
public class ApiController {
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {        
        return "panelbar/api";
    } 
}