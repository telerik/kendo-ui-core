package com.kendoui.spring.controllers.datetimepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datetimepicker-navigation-controller")
@RequestMapping(value="/web/datetimepicker/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "web/datetimepicker/navigation";
    }    
}