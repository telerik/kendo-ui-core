package com.kendoui.spring.controllers.lineargauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-linear_gauge-home-controller")
@RequestMapping(value="/linear-gauge/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "/linear-gauge/index";
    }
}
