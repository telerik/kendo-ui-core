package com.kendoui.spring.controllers.scattercharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-scatter_charts-home-controller")
@RequestMapping(value="/scatter-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/scatter-charts/index";
    }
}
