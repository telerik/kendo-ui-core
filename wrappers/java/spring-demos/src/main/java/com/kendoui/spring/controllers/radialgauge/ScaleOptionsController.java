package com.kendoui.spring.controllers.radialgauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radial_gauge-scale_options-controller")
@RequestMapping(value="/dataviz/radial-gauge/")
public class ScaleOptionsController {
    @RequestMapping(value = "/scale-options", method = RequestMethod.GET)
    public String index() {       
        return "/dataviz/radial-gauge/scale-options";
    }
}
