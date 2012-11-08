package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-navigation-controller")
@RequestMapping(value="/web/window/")
public class NavigationController {    
    
    @RequestMapping(value = "/navigation", method = RequestMethod.GET)
    public String index() {
        return "web/window/navigation";
    }
}