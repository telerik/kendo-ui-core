package com.kendoui.spring.controllers.barcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-multiple_axes-controller")
@RequestMapping(value="/bar-charts/")
public class MultipleAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/bar-charts/multiple-axes";
    }
}
