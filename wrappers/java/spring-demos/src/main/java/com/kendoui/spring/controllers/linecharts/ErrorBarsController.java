package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_charts-error_bars-controller")
@RequestMapping(value="/line-charts/")
public class ErrorBarsController {
    @RequestMapping(value = {"/", "/error-bars"}, method = RequestMethod.GET)
    public String index() {
        return "/line-charts/error-bars";
    }
}
