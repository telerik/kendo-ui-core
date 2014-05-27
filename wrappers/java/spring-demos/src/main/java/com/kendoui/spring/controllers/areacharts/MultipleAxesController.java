package com.kendoui.spring.controllers.areacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-area_charts-multiple_axes-controller")
@RequestMapping(value="/area-charts/")
public class MultipleAxesController {
    @RequestMapping(value = "/multiple-axes", method = RequestMethod.GET)
    public String index() {
        return "/area-charts/multiple-axes";
    }
}
