package com.kendoui.spring.controllers.button;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("button-api-controller")
@RequestMapping(value="/button/")
public class ApiController {
    
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index() {
        return "button/api";
    }
}