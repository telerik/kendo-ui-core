package com.kendoui.spring.controllers.scattercharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-scatter_charts-smooth_scatter_line-controller")
@RequestMapping(value="/scatter-charts/")
public class SmoothScatterLineController {
    @RequestMapping(value = "/smooth-scatter-line", method = RequestMethod.GET)
    public String index() {
        return "/scatter-charts/smooth-scatter-line";
    }
}
