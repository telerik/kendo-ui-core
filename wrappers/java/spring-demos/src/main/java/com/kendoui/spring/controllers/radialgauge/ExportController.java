package com.kendoui.spring.controllers.radialgauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radial_gauge-export-controller")
@RequestMapping(value="/radial-gauge/")
public class ExportController {
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public String index() {       
        return "/radial-gauge/export";
    }
}
