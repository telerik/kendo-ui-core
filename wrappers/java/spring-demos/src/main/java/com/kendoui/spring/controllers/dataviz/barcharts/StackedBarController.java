package com.kendoui.spring.controllers.dataviz.barcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-stacked_bar-controller")
@RequestMapping(value="/dataviz/bar-charts/")
public class StackedBarController {
    @RequestMapping(value = "/stacked-bar", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/bar-charts/stacked-bar";
    }
}
