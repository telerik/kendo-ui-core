package com.kendoui.spring.controllers.dataviz.barcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-multiple_axes-controller")
@RequestMapping(value="/dataviz/bar-charts/")
public class MultipeAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/bar-charts/multiple-axes";
    }
}
