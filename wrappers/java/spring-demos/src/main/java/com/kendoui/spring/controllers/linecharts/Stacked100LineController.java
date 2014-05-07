package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_charts-stacked100_line-controller")
@RequestMapping(value="/line-charts/")
public class Stacked100LineController {
    @RequestMapping(value = "/stacked100-line", method = RequestMethod.GET)
    public String index() {
        return "/line-charts/stacked100-line";
    }
}
