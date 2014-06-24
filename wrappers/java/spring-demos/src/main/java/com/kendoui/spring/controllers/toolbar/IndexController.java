package com.kendoui.spring.controllers.toolbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("toolbar-home-controller")
@RequestMapping(value="/toolbar/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {      
        return "toolbar/index";
    }
}