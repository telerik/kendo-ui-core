package com.kendoui.spring.controllers.autocomplete;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("autocoplete-home-controller")
@RequestMapping(value="/autocomplete/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "autocomplete/index";
    }    
}