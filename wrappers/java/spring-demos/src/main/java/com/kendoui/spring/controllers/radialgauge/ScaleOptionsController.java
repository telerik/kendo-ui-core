package com.kendoui.spring.controllers.radialgauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radial_gauge-scale_options-controller")
@RequestMapping(value="/radial-gauge/")
public class ScaleOptionsController {
    @RequestMapping(value = "/scale-options", method = RequestMethod.GET)
    public String index() {       
        return "/radial-gauge/scale-options";
    }
}
