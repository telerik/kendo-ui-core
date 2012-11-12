package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_charts-multiple_axes-controller")
@RequestMapping(value="/dataviz/line-charts/")
public class MultipeAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/line-charts/multiple-axes";
    }
}
