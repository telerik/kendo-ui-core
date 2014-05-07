package com.kendoui.spring.controllers.barcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-gap_spacing-controller")
@RequestMapping(value="/bar-charts/")
public class GapSpacingController {
    @RequestMapping(value = "/gap-spacing", method = RequestMethod.GET)
    public String index() {
        return "/bar-charts/gap-spacing";
    }
}
