package com.kendoui.spring.controllers.barcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-stacked_bar-controller")
@RequestMapping(value="/bar-charts/")
public class StackedBarController {
    @RequestMapping(value = "/stacked-bar", method = RequestMethod.GET)
    public String index() {
        return "/bar-charts/stacked-bar";
    }
}
