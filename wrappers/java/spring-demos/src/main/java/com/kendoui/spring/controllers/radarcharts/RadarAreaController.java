package com.kendoui.spring.controllers.radarcharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radar_charts-radar_area-controller")
@RequestMapping(value="/radar-charts/")
public class RadarAreaController {
    @RequestMapping(value = "/radar-area", method = RequestMethod.GET)
    public String index() {
        return "/radar-charts/radar-area";
    }
}
