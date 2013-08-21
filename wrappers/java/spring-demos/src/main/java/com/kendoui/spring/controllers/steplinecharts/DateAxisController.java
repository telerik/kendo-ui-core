package com.kendoui.spring.controllers.steplinecharts;

import java.text.ParseException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-step_line_charts-date_axis-controller")
@RequestMapping(value="/dataviz/step-line-charts/")
public class DateAxisController {
    @RequestMapping(value = "/date-axis", method = RequestMethod.GET)
    public String index(Model model) throws ParseException {
        model.addAttribute("stats", ChartDataRepository.DatePoints());
        
        return "/dataviz/step-line-charts/date-axis";
    }
}
