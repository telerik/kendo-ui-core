package com.kendoui.spring.controllers.lineargauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-linear_gauge-scale_options-controller")
@RequestMapping(value="/linear-gauge/")
public class ScaleOptionsController {
    @RequestMapping(value = "/scale-options", method = RequestMethod.GET)
    public String index() {       
        return "/linear-gauge/scale-options";
    }
}
