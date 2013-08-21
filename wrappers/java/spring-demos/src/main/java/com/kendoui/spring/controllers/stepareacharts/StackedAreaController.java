package com.kendoui.spring.controllers.stepareacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-step_area_charts-stacked_area-controller")
@RequestMapping(value="/dataviz/ste--area-charts/")
public class StackedAreaController {
    @RequestMapping(value = "/stacked-area", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step-area-charts/stacked-area";
    }
}
