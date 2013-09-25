package com.kendoui.spring.controllers.button;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("button-navigation-controller")
@RequestMapping(value="/web/button/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "web/button/navigation";
    }    
}