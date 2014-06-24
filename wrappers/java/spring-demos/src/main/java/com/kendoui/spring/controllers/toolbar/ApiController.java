package com.kendoui.spring.controllers.toolbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("toolbar-api-controller")
@RequestMapping(value="/toolbar/")
public class ApiController {
    
    @RequestMapping(value = {"/", "/api"}, method = RequestMethod.GET)
    public String index() {      
        return "toolbar/api";
    }
}