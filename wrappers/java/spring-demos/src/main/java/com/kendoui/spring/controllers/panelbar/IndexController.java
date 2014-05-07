package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-home-controller")
@RequestMapping(value="/panelbar/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "panelbar/index";
    }    
}