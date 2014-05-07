package com.kendoui.spring.controllers.slider;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("slider-navigation-controller")
@RequestMapping(value="/slider/")
public class NavigationController {
    
    @RequestMapping(value = "/navigation", method = RequestMethod.GET)
    public String index() {       
        return "slider/navigation";
    }    
}