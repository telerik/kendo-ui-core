package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-line_chart-step_line-controller")
@RequestMapping(value="/line-charts/")
public class StepLineController {
    @RequestMapping(value = "/step-line", method = RequestMethod.GET)
    public String index(Model model) {
        return "/line-charts/step-line";
    }
}