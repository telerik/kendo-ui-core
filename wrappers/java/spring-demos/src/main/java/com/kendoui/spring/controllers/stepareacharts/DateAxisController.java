package com.kendoui.spring.controllers.stepareacharts;

import java.text.ParseException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-step_area_charts-date_axis-controller")
@RequestMapping(value="/dataviz/step_area-charts/")
public class DateAxisController {
    @RequestMapping(value = "/date-axis", method = RequestMethod.GET)
    public String index(Model model) throws ParseException {
        model.addAttribute("stats", ChartDataRepository.DatePoints());
        
        return "/dataviz/step-area-charts/date-axis";
    }
}
