package com.kendoui.spring.controllers.lineargauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-linear_gauge-export-controller")
@RequestMapping(value="/linear-gauge/")
public class ExportController {
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public String index() {       
        return "/linear-gauge/export";
    }
}
