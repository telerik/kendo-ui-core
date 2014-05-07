package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_chart-smooth_line-controller")
@RequestMapping(value="/line-charts/")
public class SmoothLineController {
    @RequestMapping(value = "/smooth-line", method = RequestMethod.GET)
    public String index(Model model) {
        return "/line-charts/smooth-line";
    }
}