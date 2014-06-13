package com.kendoui.spring.controllers.waterfallcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-waterfall_charts-home-controller")
@RequestMapping(value="/waterfall-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/waterfall-charts/index";
    }
}
