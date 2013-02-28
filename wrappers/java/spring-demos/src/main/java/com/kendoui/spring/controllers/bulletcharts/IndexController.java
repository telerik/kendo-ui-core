package com.kendoui.spring.controllers.bulletcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bullet_charts-home-controller")
@RequestMapping(value="/dataviz/bullet-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {        
        return "/dataviz/bullet-charts/index";
    }
}
