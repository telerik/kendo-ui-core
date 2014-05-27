package com.kendoui.spring.controllers.areacharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-area_chart-smooth_area-controller")
@RequestMapping(value="/area-charts/")
public class SmoothAreaController {
    @RequestMapping(value = "/smooth-area", method = RequestMethod.GET)
    public String index(Model model) {
        return "/area-charts/smooth-area";
    }
}
