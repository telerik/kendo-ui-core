package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_charts-stacked_line-controller")
@RequestMapping(value="/line-charts/")
public class StackedLineController {
    @RequestMapping(value = "/stacked-line", method = RequestMethod.GET)
    public String index() {
        return "/line-charts/stacked-line";
    }
}
