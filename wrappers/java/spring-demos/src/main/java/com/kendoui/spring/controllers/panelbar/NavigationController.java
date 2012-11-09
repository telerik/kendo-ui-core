package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-navigation-controller")
@RequestMapping(value="/web/panelbar/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "web/panelbar/navigation";
    }    
}