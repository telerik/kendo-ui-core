package com.kendoui.spring.controllers.radialgauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radial_gauge-home-controller")
@RequestMapping(value="/radial-gauge/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "/radial-gauge/index";
    }
}
