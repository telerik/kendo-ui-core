package com.kendoui.spring.controllers.tooltip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tooltip-home-controller")
@RequestMapping(value="/tooltip/")
public class IndexController {    
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "tooltip/index";
    }
}

