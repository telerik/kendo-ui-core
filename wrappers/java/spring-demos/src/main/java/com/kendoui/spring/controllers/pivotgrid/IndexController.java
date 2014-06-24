package com.kendoui.spring.controllers.pivotgrid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("pivotgrid-home-controller")
@RequestMapping(value="/pivotgrid/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "pivotgrid/index";
    }
    
}

