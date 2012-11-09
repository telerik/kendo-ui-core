package com.kendoui.spring.controllers.dataviz.bubblecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bubble_charts-home-controller")
@RequestMapping(value="/dataviz/bubble-charts/")
public class HomeController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/dataviz/bubble-charts/index";
    }
}
