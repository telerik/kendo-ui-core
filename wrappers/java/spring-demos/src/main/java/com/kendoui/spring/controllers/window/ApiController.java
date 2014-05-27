package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-api-controller")
@RequestMapping(value="/window/")
public class ApiController {    
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {
        return "window/api";
    }
}

