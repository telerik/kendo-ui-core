package com.kendoui.spring.controllers.areacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-area_charts-stacked_area-controller")
@RequestMapping(value="/area-charts/")
public class StackedAreaController {
    @RequestMapping(value = "/stacked-area", method = RequestMethod.GET)
    public String index() {
        return "/area-charts/stacked-area";
    }
}
