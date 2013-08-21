package com.kendoui.spring.controllers.steplinecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-step_line_charts-multiple_axes-controller")
@RequestMapping(value="/dataviz/step-line-charts/")
public class MultipeAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step-line-charts/multiple-axes";
    }
}
