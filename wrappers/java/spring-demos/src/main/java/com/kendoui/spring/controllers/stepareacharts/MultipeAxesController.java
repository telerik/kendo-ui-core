package com.kendoui.spring.controllers.stepareacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-step-area_charts-multiple_axes-controller")
@RequestMapping(value="/dataviz/step-area-charts/")
public class MultipeAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step-area-charts/multiple-axes";
    }
}
