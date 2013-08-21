package com.kendoui.spring.controllers.steplinecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-step_line_charts-home-controller")
@RequestMapping(value="/dataviz/step-line-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step-line-charts/index";
    }
}
