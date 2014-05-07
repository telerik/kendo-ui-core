package com.kendoui.spring.controllers.progressbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("progressbar-home-controller")
@RequestMapping(value="/progressbar/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "progressbar/index";
    }    
}