package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_charts-multiple_axes-controller")
@RequestMapping(value="/line-charts/")
public class MultipleAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/line-charts/multiple-axes";
    }
}
