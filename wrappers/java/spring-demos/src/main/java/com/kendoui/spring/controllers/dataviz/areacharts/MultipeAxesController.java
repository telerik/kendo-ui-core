package com.kendoui.spring.controllers.dataviz.areacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-area_charts-multiple_axes-controller")
@RequestMapping(value="/dataviz/area-charts/")
public class MultipeAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/area-charts/multiple-axes";
    }
}
