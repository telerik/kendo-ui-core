package com.kendoui.spring.controllers.barcharts;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-bar_charts-date_axis-controller")
@RequestMapping(value="/bar-charts/")
public class DateAxisController {
    @RequestMapping(value = "/date-axis", method = RequestMethod.GET)
    public String index(Model model) throws ParseException {
        model.addAttribute("stats", ChartDataRepository.DatePoints());
        
        return "/bar-charts/date-axis";
    }
}
